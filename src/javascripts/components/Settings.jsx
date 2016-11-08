import React from "react";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = { settings: { actionDefinitions: {} } };
  }

  componentDidMount() {
    chrome.storage.sync.get("settings", ({ settings }) => {
      this.setState({ settings });
    });
  }

  render() {
    return(
      <div className="container">
        {
          Object.keys(this.state.settings.actionDefinitions).map((keyString) => {
            const definition = this.state.settings.actionDefinitions[keyString];
            return(
              <div key={keyString}>
                <div>
                  {keyString}
                </div>
                <div>
                  {definition.type}
                </div>
                <div>
                  {definition.template}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
