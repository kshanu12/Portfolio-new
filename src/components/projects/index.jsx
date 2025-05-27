'use client';

import { useEffect, useState } from 'react';
import { projects } from '@/constants/projectDetails';
import InfiniteCircularGallery from './infiniteCircularGalley';
import { useScrollController } from '@/hooks/useProjectScroll';

function ProjectSection() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setGalleryItems(projects);
        setMounted(true);
    }, []);

    // Handle scroll updates for card visibility
    const handleScroll = (kValue) => {
        // This will be called whenever the virtual scroll position changes
        // The gallery component will handle its own card visibility updates
    };

    // Initialize scroll controller only when component is mounted and has items
    const scrollController = useScrollController(
        galleryItems.length,
        mounted ? handleScroll : null
    );

    return (
        <>
            <div style={{ position: "fixed", zIndex: 9999 }} >
                <p className="subTitle">MY WORKS</p>
                <h1 className="title">Projects.</h1>
            </div>
            {mounted && galleryItems.length > 0 && (
                <InfiniteCircularGallery
                    items={galleryItems}
                    scrollController={scrollController}
                />
            )}
        </>
    );
}

export default ProjectSection;
