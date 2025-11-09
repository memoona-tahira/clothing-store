import { useState, useEffect } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInstalled) {
      console.log("App already installed — skipping prompt");
      return;
    }

    // Check if the prompt was dismissed recently
    const isDismissed = () => {
      const dismissed = localStorage.getItem("installPromptDismissed");
      if (!dismissed) return false;

      const now = Date.now();
      const dismissedAt = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (now - dismissedAt >= sevenDays) {
        localStorage.removeItem("installPromptDismissed");
        return false;
      }
      return true;
    };

    // Developer override for testing
    const isForceShow = localStorage.getItem("forceShowInstall") === "true";

    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      const dismissedRecently = isDismissed();

      console.log("InstallPrompt logic:", {
        dismissedRecently,
        isForceShow,
        localStorageValue: localStorage.getItem("installPromptDismissed"),
      });

      if (isForceShow || !dismissedRecently) {
        if (isForceShow) {
          console.log("Developer override active — forcing prompt");
          localStorage.removeItem("forceShowInstall");
        }
        setShowPrompt(true);
      } else {
        const dismissed = localStorage.getItem("installPromptDismissed");
        const dismissedDate = dismissed
          ? new Date(parseInt(dismissed)).toLocaleString()
          : "unknown";
        console.log(
          ` Prompt hidden due to recent dismissal (dismissed at ${dismissedDate}).`
        );
      }
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`User response to prompt: ${outcome}`);

      if (outcome === "accepted") {
        localStorage.removeItem("installPromptDismissed");
      } else {
        localStorage.setItem("installPromptDismissed", Date.now().toString());
      }

      setShowPrompt(false);
      setDeferredPrompt(null);
    } catch (err) {
      console.error("Install error:", err);
    }
  };

  const handleDismiss = () => {
    console.log("User dismissed install prompt manually");
    localStorage.setItem("installPromptDismissed", Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) {
    const dismissed = localStorage.getItem("installPromptDismissed");
    if (dismissed) {
      const nextAvailable = new Date(
        parseInt(dismissed) + 7 * 24 * 60 * 60 * 1000
      ).toLocaleString();
      console.log(`Prompt hidden until: ${nextAvailable}`);
    }
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-text">
          <h3>📱 Install App</h3>
          <p>Install our app for a better experience and offline access!</p>
        </div>
        <div className="install-prompt-actions">
          <button onClick={handleInstall} className="install-btn">
            Install
          </button>
          <button onClick={handleDismiss} className="dismiss-btn">
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;
