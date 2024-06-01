function BannerIntroductionComponent() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center text-gray-600">
                YasMini - Car Shop
            </h1>

            <p className="text-xl font-normal text-center mt-2">
                <span className="text-yellow-500 font-semibold">
                    "Mini Cars, Mega Deals!"
                </span>
            </p>

            <img src="/YasMiniLogo.png" className="w-1/3 m-2 p-0" alt="" />
        </div>
    );
}

export default BannerIntroductionComponent;
