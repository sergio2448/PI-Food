import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <header>
      <div>
        <div className='landingPageContainer'>
          <div className='sectionLeft'>
            <h1>Recipe Food APP</h1>
            <div>
              <p>
                Esta es una app full stack de recetas, podras encontrar diversos tipos e incluso crear las tuyas.
              </p>
              <h2>Click en Home para comenzar</h2>
            </div>
            <div className='buttonsContainer'>
              <a href='/home'>Home</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
