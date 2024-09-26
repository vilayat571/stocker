import { useState } from "react";
import "./index.css"; // Importing the index.css file

const App = () => {
  const [text, setText] = useState<string>("");

  const [changedText, setChangedText] = useState<unknown>([]);
  const [shutterLinks, setShutterLinks] = useState<unknown>([]);
  const changeText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newArr = new Set(
      text.split(",").map((item) => {
        return item.replaceAll("_", " ").slice(13, item.length - 43);
      })
    );

    // https://www.shutterstock.com/search/crowded-city?image_type=photo

    setChangedText([...newArr]);

    const shutterLinksText = [...newArr].map((item) => {
      return {
        url: `https://www.shutterstock.com/search/${item
          .trimStart()
          .split(" ")
          .slice(0, 2)
          .join(" ")}?image_type=photo`,
        name: item,
      };
    });

    console.log(shutterLinksText);

    setShutterLinks(shutterLinksText);
  };

  return (
    <div
      className="w-full 
  "
    >
      <form className=" flex flex-col gap-4 ">
        <textarea
          placeholder=" Mətn əlavə edin..."
          className="w-1/2 h-[200px] bg-white indent-3 p-4 rounded "
          value={text}
          onChange={(e) => setText(` ${e.target.value}`)}
        />
        <span>
          <button
            onClick={(e) => changeText(e)}
            className="inline-block bg-green-500 px-5 py-3 rounded text-white"
          >
            Mətni çevir
          </button>
        </span>
      </form>
      <div className="mt-16">
        <p className="text-black text-3xl mb-3">Çevrilmiş mətn:</p>
        <div>
          {changedText?.length > 0 &&
            changedText?.map((item: string, index: number) => {
              return (
                <p>
                  {index + 1}. {item}
                </p>
              );
            })}
        </div>
      </div>
      <div className="mt-16">
        <p className="text-black text-3xl mb-3">Shutter links:</p>
        <div>
          {shutterLinks?.length > 0 &&
            shutterLinks?.map((item: string, index: number) => {
              return (
                <a
                  href={item.url}
                  className="block text-blue-500"
                  target="blank"
                >
                  {index + 1}. {item.name}
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
