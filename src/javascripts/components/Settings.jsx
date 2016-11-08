import React from "react";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = { settings: { actionDefinitions: {} } };
  }

  componentDidMount() {
    const defaultSettings = {
      actionDefinitions: {
        "Ctrl+L": {
          template: "${title} ${url}",
          type: "CopyToClipboardAction",
        },
        "Ctrl+M": {
          template: "[${title}](${url})",
          type: "CopyToClipboardAction",
        },
      },
    };
    chrome.storage.sync.set({ settings: defaultSettings }, () => {
      chrome.storage.sync.get("settings", ({ settings }) => {
        this.setState({ settings });
      });
    });
  }

  render() {
    return(
      <div className="container">
        {
          Object.keys(this.state.settings.actionDefinitions).map((keyString) => {
            return(
              <div key={keyString}>
                {keyString}
              </div>
            );
          })
        }
      </div>
    );
  }
}
