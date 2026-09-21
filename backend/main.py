from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

from backend.config import DATA_DIR, UPLOAD_DIR, GARMENTS_DIR, OUTPUT_DIR, CORS_ORIGINS, HOST, PORT
from backend.routes.tryon import router as tryon_router
from backend.routes.garments import router as garments_router

app = FastAPI(
    title="DrapeAI API",
    description="AI-Powered Virtual Try-On (VTON) Platform Backend API Engine",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static file routes so frontend can fetch images directly
app.mount("/static/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
app.mount("/static/garments", StaticFiles(directory=str(GARMENTS_DIR)), name="garments")
app.mount("/static/output", StaticFiles(directory=str(OUTPUT_DIR)), name="output")

# Include API Routers
app.include_router(tryon_router)
app.include_router(garments_router)

@app.get("/")
def root():
    return {
        "name": "DrapeAI Backend API",
        "version": "1.0.0",
        "status": "online",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "storage": {
            "uploads_dir": str(UPLOAD_DIR),
            "garments_dir": str(GARMENTS_DIR),
            "output_dir": str(OUTPUT_DIR)
        }
    }

if __name__ == "__main__":
    print(f"Starting DrapeAI Backend Server on http://{HOST}:{PORT}")
    uvicorn.run("backend.main:app", host=HOST, port=PORT, reload=True)
