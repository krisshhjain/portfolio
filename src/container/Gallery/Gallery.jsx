import React from 'react';
import DomeGallery from '../../components/ReactBits/DomeGallery/DomeGallery';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import './Gallery.css';

// Import all 32 dome gallery images
const imageModules = import.meta.glob('../../assets/dome gallery/*.jpg', { eager: true });
const galleryImages = Object.values(imageModules).map((mod, i) => ({
    src: mod.default,
    alt: `Gallery photo ${i + 1}`
}));

const Gallery = () => {
    return (
        <div className="app__gallery" id="gallery">
            <h2 className="head-text gallery__title">
                <DecryptedText text="Moments" speed={50} maxIterations={10} animateOn="view" />
            </h2>
            <p className="gallery__subtitle">Drag to explore • Click to enlarge</p>
            <div className="gallery__dome-container">
                <DomeGallery
                    images={galleryImages}
                    fit={0.8}
                    minRadius={600}
                    maxVerticalRotationDeg={0}
                    segments={34}
                    dragDampening={2}
                    grayscale
                    overlayBlurColor="#060010"
                    imageBorderRadius="12px"
                    openedImageBorderRadius="16px"
                    openedImageWidth="300px"
                    openedImageHeight="420px"
                />
            </div>
        </div>
    );
};

export default Gallery;
