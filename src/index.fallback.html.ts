export const fallback =
// language=HTML
	() => `
      <div style="margin:auto; max-width:100%; width:500px; padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: 'Roboto', 'Noto', 'Helvetica Neue', Arial, Verdana, sans-serif; color: rgba(255,255,255,.84)">
          <h3 style="text-align:justify; font-size: 20px; font-weight: 600;">Please visit this site in Chrome, Opera or Safari!</h3>
          <h6 style="text-align:justify;font-size: 16px; margin: 10px">This site is built with modern technologies such as Custom Elements, WebGL, Shadow DOM, Web Animations, PointerEvents and CSS Custom properties.</h6>
          <h6 style="text-align:justify;font-size: 16px; margin: 10px">It is meant as a showcase of the modern component model for the web, not a finished product.</h6>
      </div>
	`;