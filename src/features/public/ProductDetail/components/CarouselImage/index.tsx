import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Image } from 'antd';
import { useState } from 'react';

const CustomLeftArrow = ({
    currentSlide,
    slideCount,
    ...props
}: {
    currentSlide: number;
    slideCount: number;
}) => (
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 w-6 h-12 flex items-center justify-center">
        <LeftOutlined
            {...props}
            className="text-white font-semibold text-2xl pb-1"
        />
    </div>
);

const CustomRightArrow = ({
    currentSlide,
    slideCount,
    ...props
}: {
    currentSlide: number;
    slideCount: number;
}) => (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 w-6 h-12 flex items-center justify-center">
        <RightOutlined
            {...props}
            className="text-white font-semibold text-2xl pb-1"
        />
    </div>
);
function CarouselImageComponents({ images }: { images: Storage[] }) {
    // State
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div>
            <Carousel
                autoplay
                dots={false}
                beforeChange={(to) => setCurrentSlide(to)}
                arrows
                prevArrow={
                    <CustomLeftArrow
                        currentSlide={currentSlide}
                        slideCount={images.length}
                    />
                }
                nextArrow={
                    <CustomRightArrow
                        currentSlide={currentSlide}
                        slideCount={images.length}
                    />
                }
            >
                {images.map((image: Storage, index: number) => (
                    <div key={index}>
                        <Image
                            src={image.url}
                            alt={`productResponse?.result-${index}`}
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </Carousel>
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((image: Storage, index: number) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`thumbnail-${index}`}
                        className={`w-16 h-16 object-cover cursor-pointer ${
                            currentSlide === index
                                ? 'border-2 border-blue-500'
                                : 'border'
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CarouselImageComponents;
