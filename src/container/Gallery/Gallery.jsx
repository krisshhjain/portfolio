import React from 'react';
import DomeGallery from '../../components/ReactBits/DomeGallery/DomeGallery';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import './Gallery.css';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_600,c_limit,fl_progressive';

const publicIds = [
    '20251024_142006528_iOS-1_jklmtr',
    '20260124_104536137_iOS_q15hes',
    '20260220_074911850_iOS_hrhj4g',
    '20260218_212217098_iOS_kjtvp9',
    '20260124_084351747_iOS_h9eteu',
    '20250902_093608726_iOS_y0syjc',
    '20250616_072909411_iOS_dw0t6c',
    '20260102_122851784_iOS_yay2p9',
    '20251225_031604465_iOS_wj7jv8',
    '20251101_180330246_iOS_pmifdv',
    '20251031_164939236_iOS_eybset',
    '20251001_133852525_iOS_yssubn',
    '20250524_175927846_iOS_wnw7yg',
    '20250901_183850527_iOS_q3bpwl',
    '20250615_135002074_iOS_pwvqdt',
    '20250612_125953795_iOS_x051jg',
    '20250517_104710331_iOS_haacns',
    '20250524_181250941_iOS_bjainl',
    '20250524_180937375_iOS_j0a2yw',
    '20241231_111130005_iOS_wyfopm',
    '20250103_121643980_iOS_rndzbk',
    '20250101_095716026_iOS_jpvgcp',
    '20241230_103627004_iOS_mwatfd',
    '20241101_022156502_iOS_oj6kyb',
    '20250101_123752131_iOS_ugmh3k',
    '20241101_023830213_iOS_qbnnzy',
    '20241230_121405429_iOS_lpwx50',
    '20241031_072621919_iOS_kkxqjp',
    '20241225_155152840_iOS_fepjkk',
    '20240528_091143900_iOS_nw9ij4',
    '20241031_214837956_iOS_yncciu',
    '20240111_151128612_iOS_r8i0v6',
    '20241026_113633119_iOS_kluabp',
];

const galleryImages = publicIds.map((id, i) => ({
    src: `${CLOUDINARY_BASE}/${id}`,
    alt: `Moment ${i + 1}`
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
