import React, { useEffect, useState, useCallback } from "react";

const radius = 100;

function App() {
  const [circles, setCircles] = useState([]);

  const findIntersectingCircle = useCallback((circles, x1, y1) => {
    const intersectedCircle = circles.filter(({ radiusX: x2, radiusY: y2 }) => {
      const conditionForX = 2 * radius > Math.abs(x1 - x2);
      const conditionForY = 2 * radius > Math.abs(y1 - y2);
      return conditionForX && conditionForY;
    });
    return intersectedCircle || [];
  }, []);

  const handleClick = useCallback((event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    // console.log({ clientX, clientY });

    const radiusY = window.scrollY + clientY;
    const radiusX = window.scrollX + clientX;

    const top = radiusY - radius;
    const left = radiusX - radius;

    const circleProps = {
      radiusY,
      radiusX,
      top,
      left,
      color: "red"
    };

    setCircles((prevState) => {
      const intersectedCircle = findIntersectingCircle(
        prevState,
        radiusX,
        radiusY
      );
      if (intersectedCircle.length) {
        circleProps.color = "blue";
      }
      return [...prevState, circleProps];
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => handleClick(e));
    return () => {
      document.body.removeEventListener("click", (e) => handleClick(e));
    };
  }, []);

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {circles.map(({ top, left, color }) => {
        return (
          <div
            draggable
            style={{
              width: 2 * radius,
              height: 2 * radius,
              backgroundColor: color,
              position: "absolute",
              top,
              left,
              borderRadius: "50%"
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default App;
