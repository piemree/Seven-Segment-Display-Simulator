import Button, { ButtonProps } from "@/components/Button";
import SevenSegmentDisplay, {
  SevenSegmentDisplayValues,
} from "@/components/SevenSegmentDisplay";
import displayConsts from "@/display-consts";
import MainLayout from "@/layout/MainLayout";
import { wait } from "@/utils";
import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdClose,
  MdEdit,
  MdOutlineCopyAll,
  MdOutlineRocket,
  MdOutlineRocketLaunch,
  MdRestartAlt,
  MdRocket,
  MdRocketLaunch,
} from "react-icons/md";

export default function Home() {
  const [values, setValues] = useState<SevenSegmentDisplayValues>(
    displayConsts.none
  );
  const [buttonProps, setButtonProps] = useState<ButtonProps[]>([]);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [duration, setDuration] = useState(1000);
  const [isInfinte, setIsInfinte] = useState(false);

  const onCreateButtonFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const buttonText = formData.get("buttonText") as string;
    const newButtonProps: ButtonProps = {
      id: uuidv4(),
      Text: buttonText,
      setDisplayValues: setValues,
      displayValues: {
        a: formData.get("a") === "on",
        b: formData.get("b") === "on",
        c: formData.get("c") === "on",
        d: formData.get("d") === "on",
        e: formData.get("e") === "on",
        f: formData.get("f") === "on",
        g: formData.get("g") === "on",
      },
    };

    const newAllButtonProps = [...buttonProps, newButtonProps];
    setButtonProps(newAllButtonProps);
    localStorage.setItem("buttonProps", JSON.stringify(newAllButtonProps));
    form.reset();
  };

  const deleteButtonProp = (id: string) => {
    const newButtonProps = buttonProps.filter(
      (buttonProp) => buttonProp.id !== id
    );
    setButtonProps(newButtonProps);
    localStorage.setItem("buttonProps", JSON.stringify(newButtonProps));
  };

  const editButtonProp = (buttonProp: ButtonProps) => {
    const newButtonProps = buttonProps.filter((bp) => bp.id !== buttonProp.id);
    setButtonProps(newButtonProps);
    localStorage.setItem("buttonProps", JSON.stringify(newButtonProps));
    wait(100).then(() => {
      const form = document.getElementById(
        "createButtonFrom"
      ) as HTMLFormElement;
      form["buttonText"].value = buttonProp.Text;
      form["a"].checked = buttonProp.displayValues.a;
      form["b"].checked = buttonProp.displayValues.b;
      form["c"].checked = buttonProp.displayValues.c;
      form["d"].checked = buttonProp.displayValues.d;
      form["e"].checked = buttonProp.displayValues.e;
      form["f"].checked = buttonProp.displayValues.f;
      form["g"].checked = buttonProp.displayValues.g;
    });
  };

  const copyCurrentValues = () => {
    const form = document.getElementById("createButtonFrom") as HTMLFormElement;
    form["a"].checked = values.a;
    form["b"].checked = values.b;
    form["c"].checked = values.c;
    form["d"].checked = values.d;
    form["e"].checked = values.e;
    form["f"].checked = values.f;
    form["g"].checked = values.g;
  };

  const launchRocket = async () => {
    setRocketLaunched(true);

    for (const buttonProp of buttonProps) {
      const button = document.getElementById(buttonProp.id) as HTMLDivElement;
      button.classList.add("opacity-50");
      setValues(buttonProp.displayValues);
      await wait(duration);
      button.classList.remove("opacity-50");
    }

    setRocketLaunched(false);
  };

  const moveUpButton = (id: string) => {
    const index = buttonProps.findIndex((buttonProp) => buttonProp.id === id);
    if (index === 0) return;
    const newButtonProps = [...buttonProps];
    const temp = newButtonProps[index];
    newButtonProps[index] = newButtonProps[index - 1];
    newButtonProps[index - 1] = temp;
    setButtonProps(newButtonProps);
    localStorage.setItem("buttonProps", JSON.stringify(newButtonProps));
  };

  const moveDownButton = (id: string) => {
    const index = buttonProps.findIndex((buttonProp) => buttonProp.id === id);
    if (index === buttonProps.length - 1) return;
    const newButtonProps = [...buttonProps];
    const temp = newButtonProps[index];
    newButtonProps[index] = newButtonProps[index + 1];
    newButtonProps[index + 1] = temp;
    setButtonProps(newButtonProps);
    localStorage.setItem("buttonProps", JSON.stringify(newButtonProps));
  };

  useEffect(() => {
    const savedButtonProps = localStorage.getItem("buttonProps");
    if (savedButtonProps) {
      setButtonProps(JSON.parse(savedButtonProps));
    }
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl text-center font-bold p-4 bg-blue-500 text-white">
        Seven Segment Display Simulator
      </h1>
      <div className="flex  flex-wrap gap-x-20 gap-y-10  justify-center p-5">
        <div className="flex flex-col gap-5">
          <form
            id="createButtonFrom"
            onSubmit={onCreateButtonFormSubmit}
            className="flex flex-col gap-2  border p-5 rounded-lg shadow-md"
          >
            <input
              className="border p-2 rounded bg-black text-white"
              type="text"
              name="buttonText"
              placeholder="Button Text"
              required
            />
            <div className="grid grid-cols-4 gap-2">
              <div className="flex gap-2 items-center">
                <input name="a" type="checkbox" id="a" />
                <label htmlFor="a">a</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="b" type="checkbox" id="b" />
                <label htmlFor="b">b</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="c" type="checkbox" id="c" />
                <label htmlFor="c">c</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="d" type="checkbox" id="d" />
                <label htmlFor="d">d</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="e" type="checkbox" id="e" />
                <label htmlFor="e">e</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="f" type="checkbox" id="f" />
                <label htmlFor="f">f</label>
              </div>
              <div className="flex gap-2 items-center">
                <input name="g" type="checkbox" id="g" />
                <label htmlFor="g">g</label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Button
            </button>
          </form>
          <div className="flex  gap-2 items-end justify-center w-full p-5 rounded-lg shadow-md bg-blue-500 text-white">
            <div className="flex flex-col">
              <label htmlFor="durayion" className="">
                Duration in ms
              </label>
              <input
                id="duration"
                type="number"
                placeholder="Duration in ms"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="border p-2 rounded bg-black text-white"
              />
            </div>
            <span
              onClick={launchRocket}
              className="rocket flex items-center justify-center cursor-pointer w-8 h-8"
            >
              {rocketLaunched ? (
                <MdRocketLaunch
                  id="rocket"
                  size={30}
                  color="red"
                  className="-rotate-45"
                />
              ) : (
                <MdRocket id="rocket" size={30} color="red" />
              )}
            </span>
          </div>
          {buttonProps.map((buttonProp) => (
            <div
              id={buttonProp.id}
              key={buttonProp.id}
              className="flex gap-2 items-center"
            >
              <div className="flex flex-col gap-1 items-center">
                <MdArrowDropUp
                  onClick={() => moveUpButton(buttonProp.id)}
                  className="cursor-pointer"
                  size={25}
                />
                <MdArrowDropDown
                  onClick={() => moveDownButton(buttonProp.id)}
                  className="cursor-pointer"
                  size={25}
                />
              </div>
              <Button
                id={buttonProp.id}
                Text={buttonProp.Text}
                displayValues={buttonProp.displayValues}
                setDisplayValues={setValues}
                className="flex-1 h-full"
              />
              <div className="flex flex-col gap-1 items-center">
                <button
                  onClick={() => deleteButtonProp(buttonProp.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded"
                >
                  <MdClose />
                </button>
                <button
                  onClick={() => editButtonProp(buttonProp)}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold p-1 rounded"
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 items-center  rounded-lg shadow-md">
          <SevenSegmentDisplay values={values} setValues={setValues} />
          <div className="flex gap-2 items-center justify-center w-full">
            <button
              onClick={copyCurrentValues}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <MdOutlineCopyAll />
            </button>
            <button
              onClick={() => setValues(displayConsts.none)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <MdRestartAlt />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
