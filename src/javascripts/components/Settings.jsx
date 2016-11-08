import { detectKeyString } from "key-string";
import React from "react";

class Action extends React.Component {
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
          <span onClick={() => { this.props.onDeleteButtonClick(this.props.keyString) }} className="cursor-pointer">×</span>
        </td>
      </tr>
    );
  }
}

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      actionType: "CopyToClipboardAction",
      keyString: "",
      template: "",
      settings: { actionDefinitions: {} },
    };
  }

  componentDidMount() {
    chrome.storage.sync.get("settings", ({ settings }) => {
      this.setState({ settings });
    });
  }

  onDeleteButtonClick(keyString) {
    delete this.state.settings.actionDefinitions[keyString];
    this.setState({ settings: this.state.settings });
    chrome.storage.sync.set({ settings: this.state.settings });
  }

  onKeyDown(event) {
    this.setState({
      keyString: detectKeyString(event)
    });
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
      settings,
      actionType: "CopyToClipboardAction",
      keyString: "",
      template: "",
    });
    chrome.storage.sync.set({ settings });
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
              <section className="card">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Action</th>
                      <th>Template</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
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
                        <input type="text" onKeyDown={this.onKeyDown.bind(this)} value={this.state.keyString} className="form-control"/>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <div className="form-label">
                          Action
                        </div>
                        <div className="form-select-container">
                          <select className="form-control" value={this.state.actionType}>
                            <option value="CopyToClipboardAction">Copy to clipboard</option>
                          </select>
                        </div>
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        <div className="form-label">
                          Template
                        </div>
                        <textarea className="form-control" value={this.state.template} onChange={(event) => { this.setState({ template: event.target.value }) }}/>
                      </label>
                      <div className="form-note">
                        {"${title} and ${url} variables are available."}
                      </div>
                    </div>
                    <div className="form-group">
                      <input className="button button-primary" type="submit" value="Add"/>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="section">
            <div className="container">
              © 2016 Ryo Nakamura
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
