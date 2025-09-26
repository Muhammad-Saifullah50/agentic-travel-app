
interface ImageGalleryProps {
  data: any[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data }) => {
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((place, idx) => (
        <div key={idx} className="bg-white bg-opacity-10 rounded-xl p-3 flex flex-col items-center">
          {place.image_url && (
            <img src={place.image_url} alt={place.title ?? "Place image"} className="w-full h-32 object-cover rounded-lg mb-2" />
          )}
          <div className="font-bold text-lg mb-1">{place.title ?? "-"}</div>
          <div className="text-sm mb-1">{place.description ?? "-"}</div>
          <div className="text-xs text-gray-300">{place.location ?? "-"}</div>
          <div className="text-xs text-gray-400">{place.category ?? "-"}</div>
          <div className="text-xs text-yellow-400">Rating: {place.rating ?? "-"}</div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
