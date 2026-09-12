import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('WELCOME_FROM_EMAIL') ?? 'DrapeAI <onboarding@resend.dev>';
    const appUrl = Deno.env.get('APP_URL') ?? 'http://localhost:5173';

    if (!resendApiKey) throw new Error('RESEND_API_KEY is not configured');

    const authorization = request.headers.get('Authorization');
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user?.email) {
      return new Response(JSON.stringify({ error: 'Authenticated user required' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (user.user_metadata?.welcome_email_sent_at) {
      return new Response(JSON.stringify({ sent: false, reason: 'already_sent' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const name = user.user_metadata?.full_name || user.email.split('@')[0];
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [user.email],
        subject: 'Welcome to DrapeAI',
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#17140f"><p style="color:#8a6a3b;letter-spacing:2px;text-transform:uppercase;font-size:12px">DrapeAI</p><h1 style="font-size:32px;font-weight:500">Welcome, ${name}.</h1><p style="font-size:16px;line-height:1.6;color:#524a3e">Your private fitting room is ready. Upload a photo, explore your next look, and see the drape before it reaches your cart.</p><a href="${appUrl}/hero" style="display:inline-block;background:#17140f;color:#f6f3ee;padding:14px 22px;border-radius:24px;text-decoration:none">Open DrapeAI</a><p style="font-size:12px;color:#8b8478;margin-top:36px">Your photos stay private and yours.</p></div>`,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      throw new Error(`Resend failed: ${details}`);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    await adminClient.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, welcome_email_sent_at: new Date().toISOString() },
    });

    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
