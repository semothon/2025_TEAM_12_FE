import { useRef, useEffect } from 'react';

export default function useDragScroll(containerRef) {
    const isDragging = useRef(false);
    const isOverflowingX = useRef(false);
    const isOverflowingY = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const startDrag = (e) => {
        e.preventDefault();
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const dx = lastMousePos.current.x - e.clientX;
        const dy = lastMousePos.current.y - e.clientY;

        // 일반 스크롤 처리
        if (!isOverflowingX.current) {
            containerRef.current.scrollLeft += dx;
        }
        if (!isOverflowingY.current) {
            containerRef.current.scrollTop += dy;
        }

        // X축 엘라스틱 스크롤 처리
        if (containerRef.current.scrollLeft <= 0 ||
            containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.clientWidth) {
            if (!isOverflowingX.current) isOverflowingX.current = true;
            const marginbefore = parseInt(containerRef.current.style.marginLeft || 0);
            containerRef.current.style.marginLeft = parseInt(containerRef.current.style.marginLeft || 0) - dx / 3 + 'px';
            if (marginbefore * (marginbefore - dx) < 0) {
                containerRef.current.style.marginLeft = 0;
                isOverflowingX.current = false;
            }
        }

        // Y축 엘라스틱 스크롤 처리
        if (containerRef.current.scrollTop <= 0 ||
            containerRef.current.scrollTop >= containerRef.current.scrollHeight - containerRef.current.clientHeight) {
            if (!isOverflowingY.current) isOverflowingY.current = true;
            const marginbefore = parseInt(containerRef.current.style.marginTop || 0);
            containerRef.current.style.marginTop = parseInt(containerRef.current.style.marginTop || 0) - dy / 3 + 'px';
            if (marginbefore * (marginbefore - dy) < 0) {
                containerRef.current.style.marginTop = 0;
                isOverflowingY.current = false;
            }
        }

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;

        if (isOverflowingX.current || isOverflowingY.current) {
            isOverflowingX.current = false;
            isOverflowingY.current = false;
            containerRef.current.style.transition = 'margin 0.2s';
            containerRef.current.style.marginLeft = 0;
            containerRef.current.style.marginTop = 0;
            setTimeout(() => {
                containerRef.current.style.transition = 'none';
            }, 200);
        }
        isDragging.current = false;

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    });

    return {
        isDragging,
        startDrag
    };
}