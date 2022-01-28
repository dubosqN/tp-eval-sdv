let request = require('request');

class DAO {
    constructor(api_key, user_agent) {
        this.api_key = api_key;
        this.user_agent =  user_agent;
        this.url = 'https://www.giantbomb.com/api';
    }

    _makeRequest(url, callback) {
        return new Promise((resolve, reject) => {
            let options = {
                url: url,
                headers: {
                    'User-Agent': this.user_agent
                }
            };
            request(options, function(error, response, body){
                if(!error && response.statusCode === 200) {
                    if (callback) callback(error, response, body);
                    resolve(body);
                } else {
                    if (callback) callback(error, response, body);
                    reject({error, response, body});
                }
            });
        });
    }

    _buildURL(type, options) {
        let id = options.id;
        let fields = options.fields;
        let offset = options.offset || 0;
        let limit = options.limit || 0;
        let resources = options.resources;
        let query = options.query;
        let filter = options.filter;
        let sort = options.sort;
        let format = options.format || 'json';

        let url = `${this.url}/${type}` +
            `${id ? ('/' + id) : ''}` +
            `/?api_key=${this.api_key}` +
            `${query ? '&query=' + query : ''}` +
            `${resources ? '&resources=' + resources.join(',') : ''}` +
            `${fields ? '&field_list=' + fields.join(',') : ''}` +
            `&offset=${offset}&limit=${limit}&format=${format}` +
            `${filter ? `&filter=${filter}` : ''}` +
            `${sort ? `&sort=${sort}` : ''}`;

        return url;
    }

    search(options, callback = null) {
        let url = this._buildURL('search', options);
        return this._makeRequest(url, callback);
    }

    getGame(options, callback = null) {
        var url = this._buildURL('game', options);
        return this._makeRequest(url, callback);
    }
}

module.exports = DAO;