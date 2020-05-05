import {options, scriptName} from 'yargs';
import {GetTopCards} from "./commands/GetTopCards";

const getTopCards = new GetTopCards()
scriptName('retro-counter')
    .usage('$0 <cmd> [args]')
    .command('get-top-cards', 'find cards with most votes (comments) on them', args => {
        options({
            'board-key': {
                type: 'string',
                describe: 'The board key to check. This can be found in the url as /b/<board-key>',
            },
            'limit': {
                type: "number",
                describe: 'The number of cards to return with highest votes',
                default: 5
            },
        })
    }, args1 => getTopCards.run(args1))
    .options({
        'trello-key': {
            type: "string",
            describe: 'The api key to access trello',
            default: process.env.TRELLO_KEY,
        },
        'trello-secret': {
            type: "string",
            describe: 'The api token to access trello',
            default: process.env.TRELLO_SECRET,
        }
    })
    .help()
    .argv;
