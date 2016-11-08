import { detectKeyString } from "key-string";
import React from "react";

class Action extends React.Component {
  onDeleteButtonClick() {
    this.props.onDeleteButtonClick(this.props.keyString);
  }

  render() {
    return(
      <tr>
        <td>
          <kbd>{this.props.keyString}</kbd>
        </td>
        <td>
          {this.props.actionDefinition.type}
        </td>
        <td>
          {this.props.actionDefinition.template}
        </td>
        <td>
          <span onClick={this.onDeleteButtonClick.bind(this)} className="cursor-pointer">×</span>
        </td>
      </tr>
    );
  }
}

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  componentDidMount() {
    chrome.storage.sync.get("settings", ({ settings }) => {
      this.setState({ settings });
    });
  }

  getInitialState() {
    return {
      actionType: "",
      keyString: "",
      settings: {
        actionDefinitions: {},
      },
      template: "",
    };
  }

  onDeleteButtonClick(keyString) {
    delete this.state.settings.actionDefinitions[keyString];
    this.setState({ settings: this.state.settings });
    chrome.storage.sync.set({ settings: this.state.settings });
  }

  onKeyDown(event) {
    const keyString = detectKeyString(event);
    if (!keyString.includes("Unknown")) {
      this.setState({ keyString });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const settings = {
      actionDefinitions: {
        ...this.state.settings.actionDefinitions,
        [this.state.keyString]: {
          template: this.state.template,
          type: this.state.actionType,
        },
      },
    };
    this.setState({
      ...this.getInitialState(),
      settings,
    });
    chrome.storage.sync.set({ settings });
  }

  render() {
    return(
      <div>
        <header className="header">
          <div className="section">
            <div className="container">
                <h1 className="header-heading">
                  Keyworks settings
                </h1>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="section">
            <div className="container">
              <section className="card">
                <table className="table">
                  <tbody>
                    {
                      Object.keys(this.state.settings.actionDefinitions).map((keyString) => {
                        return(
                          <Action
                            actionDefinition={this.state.settings.actionDefinitions[keyString]}
                            key={keyString}
                            keyString={keyString}
                            onDeleteButtonClick={this.onDeleteButtonClick.bind(this)}
                          />
                        );
                      })
                    }
                  </tbody>
                </table>
              </section>
              <section className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                      <label>
                        <div className="form-label">
                          Key
                        </div>
                        <input type="text" onKeyDown={this.onKeyDown.bind(this)} value={this.state.keyString} className="form-control" required/>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <div className="form-label">
                          Action
                        </div>
                        <div className="form-select-container">
                          <select className="form-control" value={this.state.actionType} onChange={(event) => { this.setState({ actionType: event.target.value }); }} required>
                            <option value=""></option>
                            {
                              [
                                "CopyToClipboard",
                                "ScrollDown",
                                "ScrollUp",
                              ].map((actionType) => {
                                return(
                                  <option value={actionType}>
                                    {actionType}
                                  </option>
                                );
                              })
                            }
                          </select>
                        </div>
                      </label>
                    </div>
                    { this.state.actionType === "CopyToClipboard" &&
                      <div className="form-group">
                        <label>
                          <div className="form-label">
                            Template
                          </div>
                          <textarea className="form-control" value={this.state.template} onChange={(event) => { this.setState({ template: event.target.value }); }} required/>
                        </label>
                        <div className="form-note">
                          {"${title} and ${url} variables are available."}
                        </div>
                      </div>
                    }
                    <div className="form-group">
                      <input className="button button-primary" type="submit" value="Add"/>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
