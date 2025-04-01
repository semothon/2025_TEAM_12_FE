import React, { useRef, useEffect, useState } from 'react';
import placeHolder from '../assets/placeholder.jpg';
import { useZoom, useDragScroll } from '../hooks/Map';

export default function Map({ children }) {
    const containerRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [baseScale, setBaseScale] = useState(400);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // 이미지 로드 시 실제 크기 가져오기
    useEffect(() => {
        const img = new Image();
        img.src = placeHolder;
        img.onload = () => {
            setImageSize({
                width: img.width,
                height: img.height
            });
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (imageSize.width && imageSize.height) {
                window.innerWidth / window.innerHeight > imageSize.width / imageSize.height ?
                    setBaseScale(100 * imageSize.width / window.innerWidth) :
                    setBaseScale(100 * imageSize.height / window.innerHeight);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageSize]);

    const { scale } = useZoom(containerRef, 100, 100);
    const { isDragging, startDrag } = useDragScroll(containerRef);

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
                cursor: isDragging.current ? "grabbing" : "grab",
                position: "relative",
            }}
            onMouseDown={startDrag}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformOrigin: "0 0",
                }}
            >
                <img
                    src={placeHolder}
                    alt="Map"
                    style={{
                        width: imageSize.width * scale / baseScale + "px",
                        height: imageSize.height * scale / baseScale + "px",
                        transformOrigin: "0 0",
                        objectFit: "contain",
                        userSelect: "none",
                    }}
                    draggable={false}
                    onClick={() => { setSelectedIndex(null) }}
                />
                {
                    React.Children.map(
                        children,
                        (child, index) => React.cloneElement(
                            child,
                            {
                                postScale: scale / baseScale,
                                onClick: () => setSelectedIndex(index),
                                isSelected: selectedIndex === index
                            }
                        )
                    )
                }
            </div>
        </div>
    );
}