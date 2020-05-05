import {Client} from "../client";

export class GetTopCards {
    private client;

    constructor() {
    }

    private setup(args) {
        const trelloKey: string = process.env.TRELLO_KEY ?? args.trelloKey;
        const trelloSecret: string = process.env.TRELLO_SECRET ?? args.trelloSecret;
        if (!trelloKey || !trelloSecret) {
            throw new Error('No trello secret or key exists! You must pass these are arguments or add them to your shell environment via .bashrc or .zshrc')
        }

        this.client = new Client(trelloKey, trelloSecret);
    }

    public async run(args) {
        if (!args || !args.boardKey) {
            throw new Error('No board key specified');
        }
        this.setup(args);
        let cards: Array<any>;
        try {
            cards = await this.client.getCards(args.boardKey);
        } catch (e) {
            console.log(e.message);
            return false;
        }
        const cardsWithComments = cards.filter((value, index) => {
            return value.badges?.comments > 0;
        });
        const cardsSorted = cardsWithComments.sort((a, b) => {
            if (a.badges?.comments < b.badges?.comments) {
                return 1;
            }
            if (a.badges?.comments > b.badges?.comments) {
                return -1;
            }
        });

        const topCards = cardsSorted.slice(0, args.limit);
        const topCardsMapped = topCards.map((value, index) => {
            return {position: ++index, name: value.name, votes: value.badges.comments}
        })
        console.table(topCardsMapped);
    }
}
