/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSettings: any;
    chatwootSDK: any;
  }
}

const areChatwootParamsValid = (
  baseUrl?: string,
  websiteToken?: string,
  production?: boolean
) => {
  if (!baseUrl) {
    if (!production) {
      // eslint-disable-next-line no-console
      console.error("Chatwoot base url is required.");
    }
    return false;
  }

  if (!websiteToken) {
    if (!production) {
      // eslint-disable-next-line no-console
      console.error("Chatwoot website token is required.");
    }
    return false;
  }

  return true;
};

const defaultSettings = {
  type: "standard",
};

const loadChatwoot = (
  baseUrl: string,
  websiteToken: string,
  settings: any = defaultSettings
) => {
  window.chatwootSettings = settings;

  // Avoid loading the chat multiple times
  if (typeof window.chatwootSDK === "undefined") {
    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = `${baseUrl}/packs/js/sdk.js`;

    document.body.appendChild(scriptElement);

    scriptElement.onload = () => {
      window.chatwootSDK.run({
        websiteToken,
        baseUrl,
      });
    };

    return;
  }
};

const settings = {
  type: "expanded_bubble",
  launcherTitle: "Any questions? Ask Jeremie!",
};

/**
 * Load and display the Chatwoot widget on a page.
 *
 * @param {string} baseUrl The URL of the Chatwoot instance
 * @param {string} websiteToken The token to connect to the Chatwoot instance
 */
export const Chatwoot = ({
  baseUrl,
  websiteToken,
  production,
}: {
  baseUrl?: string;
  websiteToken?: string;
  production?: boolean;
}) => {
  useEffect(() => {
    if (!areChatwootParamsValid(baseUrl, websiteToken, production)) {
      return;
    }

    if (typeof window == "undefined") {
      return;
    }

    // As Chatwoot includes a script which is not removed when navigating
    // to pages client side and their SDK does not provide any function
    // to hide the button, we have to hide it ourselves.
    const container = document.querySelector(
      ".woot--bubble-holder"
    ) as HTMLElement;
    if (typeof window.chatwootSDK !== "undefined") {
      if (!container) return;
      container.style.display = "block";
    } else {
      loadChatwoot(baseUrl || "", websiteToken || "", settings);
    }
  }, [baseUrl, websiteToken, production]);
  return null;
};
