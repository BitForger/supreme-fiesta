## Usage
You need to get a key and token from trello to use this tool

1. Go to [this website](https://trello.com/app-key) to obtain the app key
2. On the same page, you need to click on the link to get a token. Walk through the OAUTH flow to get a token for authentication.
3. You can either choose to use the key and token as command line arguments, or you can add it to your environment by creating variables in your `.bashrc` or `.zshrc` file.
    ```bash
    export TRELLO_KEY=<your_token>
    export TRELLO_SECRET=<your_secret>
    ```
4. Run the command

## TODO:
- [ ] Add OAUTH integration
