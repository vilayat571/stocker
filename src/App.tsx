import { useEffect, useState } from "react";
import "./index.css"; // Importing the index.css file

const App = () => {
  const [text, setText] = useState<string>(" ");

  const [show, setShow] = useState<boolean>(false);

  // Define the state with specific types
  const [changedText, setChangedText] = useState<string[]>([]);
  const [shutterLinks, setShutterLinks] = useState<
    { url: string; name: string }[]
  >([]);

  useEffect(() => {
    const handleBeforeUnload = (event:BeforeUnloadEvent) => {
      // The following line is necessary to trigger a confirmation dialog.
      event.preventDefault();
      
      // For modern browsers, this line triggers the dialog.
      event.returnValue = '';
    };

    // Add event listener for beforeunload when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const changeText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (text.length == 0) {
      alert("Mətn boş ola bilməz!");
    } else {
      setShow(!show);

      const newArr = new Set(
        text.split(",").map((item) => {
          // Use replace with regex to replace all "_" with " "
          return item.replace(/_/g, " ").slice(13, item.length - 43);
        })
      );

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

      setShutterLinks(shutterLinksText);
    }
  };

  return (
    <>
    <div className="w-full flex items-center justify-center h-screen
        xl:flex lg:flex md:flex sm:hidden
">
      <form className="flex flex-col gap-4 items-center  w-full relative bottom-12 justify-center">
        <>
          <p className="text-2xl">
            Adobe Stock-dan götürdüyünüz mətni input-a daxil edin:
          </p>
          <textarea
            placeholder="Mətn əlavə edin..."
            className="w-4/5 h-[450px] bg-white outline-none border-blue-500 border-[2px] indent-3 p-2 placeholder:text-black text-black rounded"
            value={text}
            onChange={(e) => setText(e.target.value)} // Removed leading space
          />
          <span>
            <button
              onClick={(e) => changeText(e)}
              className="inline-block bg-blue-500 px-5 py-3 rounded text-white"
            >
              Mətni çevir
            </button>
          </span>
        </>
      </form>
      {show && (
        <div className="fixed z-10 bg-[#F8F8F8] left-0 top-0 h-screen w-full grid grid-cols-2 overflow-auto ">
          <div className="col-span-1 border p-12">
            <p className="text-black text-3xl mb-3">Çevrilmiş mətn:</p>
            <div className="flex flex-col gap-y-3">
              {changedText.length > 0 &&
                changedText.map((item: string, index: number) => {
                  return (
                    <p key={index}>
                      {" "}
                      {/* Added key prop */}
                      {index + 1}. {item}
                    </p>
                  );
                })}
            </div>
            <button
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClick={() => {setShow(!show),setText('')}}
              className="inline-block bg-blue-500 mt-8 px-5 py-3 rounded text-white"
            >
              Yeni mətn çevir
            </button>
          </div>
          <div className=" col-span-1 border-l border-[1.5px] p-12">
            <p className="text-black text-3xl mb-3">Shutter stock linkləri:</p>
            <div className="flex flex-col gap-y-3">
              {shutterLinks.length > 0 &&
                shutterLinks.map((item, index) => {
                  // Type can be inferred
                  return (
                    <a
                      key={index} // Added key prop
                      href={item.url}
                      className=" block text-blue-500"
                      target="_blank" // Changed to "_blank" for opening in new tab
                      rel="noopener noreferrer" // Added for security
                    >
                      {index + 1}. {item.name}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center justify-center w-full text-center h-screen text-3xl 
    xl:hidden lg:hidden md:hidden sm:block
    ">
<p>
  Üzür istəyirik bu sayt 
  <br />
  sadəcə desktop cihazlarda çalışır.
</p>
    </div>
    </>
  );
};

export default App;
