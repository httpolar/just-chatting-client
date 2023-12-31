import { useRouteError } from "react-router-dom";

export const ErrorRoute = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="font-mono">{JSON.stringify(error, null, 2)}</i>
      </p>
    </div>
  );
};
