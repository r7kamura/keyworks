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
      <div>
        <header className="header">
          <div className="section">
            <div className="container">
              <div className="card-transparent">
                <h1 className="header-heading">
                  Keyworks settings
                </h1>
              </div>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="section">
            <div className="container">
              <div className="card">
                <div className="list-group">
                  {
                    Object.keys(this.state.settings.actionDefinitions).map((keyString) => {
                      const definition = this.state.settings.actionDefinitions[keyString];
                      return(
                        <div key={keyString} className="list-group-element">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
