import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Client {
    private trelloClient: AxiosInstance;

    public async getCards(boardKey: string, fullObj = false) {
        const url = `/boards/${boardKey}/cards`;
        if (fullObj) {
            return this.trelloClient.get(url);
        } else {
            return (await this.trelloClient.get(url)).data;
        }
    }

    constructor(private readonly TRELLO_KEY: string, private readonly TRELLO_SECRET: string) {
        const config: AxiosRequestConfig = {
            baseURL: 'https://api.trello.com/1',
        }
        this.trelloClient = axios.create(config);
        this.trelloClient.interceptors.request.use(value => {
            value.url = `${value.url}?key=${this.TRELLO_KEY}&token=${this.TRELLO_SECRET}`
            return value;
        })
    }
}
