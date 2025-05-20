'use client';

import { useEffect, useState } from 'react';
import { projects } from '@/constants/projectDetails';
import InfiniteCircularGallery from './infiniteCircularGalley';

function ProjectSection() {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        setGalleryItems(projects);
    }, []);

    return (
        <>
            <div style={{position:"fixed", zIndex:9999}} >
                <p className="subTitle">MY WORKS</p>
                <h1 className="title">Projects.</h1>
            </div>
            {galleryItems.length > 0 && (
                <InfiniteCircularGallery items={galleryItems} />
            )}
        </>
    );
}

export default ProjectSection;
