class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = {
            "picture": 200,
            "photo": 50,
            "item": 250
        };
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        if (!Object.keys(this.possibleArticles).some(key => key.toLowerCase() === articleModel.toLowerCase())) {
            throw new Error('This article model is not included in this gallery!');
        }
        quantity = Number(quantity);
        let article = this.listOfArticles.find(x => Object.values(x)[0] == articleModel && Object.values(x)[1] == articleName);

        if (article == undefined) {
            articleModel = articleModel.toLowerCase();
            this.listOfArticles.push({
                articleModel,
                articleName,
                quantity
            });
        }
        else {
            article.quantity += quantity;
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest(guestName, personality) {
        if (Object.values(this.guests).some(x => x.guestName === guestName)) {
            throw new Error(`${guestName} has already been invited.`);
        }
        let points = 0;
        switch (personality) {
            case "Vip": points = 500;
                break;
            case 'Middle': points = 250;
                break;
            default: points = 50;
        }

        this.guests.push({
            guestName,
            points,
            purchaseArticle: 0,
        });
        return `You have successfully invited ${guestName}!`;
    }

    buyArticle(articleModel, articleName, guestName) {
        let article = this.listOfArticles.find(x => x.articleName === articleName && x.articleModel === articleModel);
        if (article == undefined) {
            throw new Error('This article is not found.');
        }
        else if (article.quantity == 0) {
            return `The ${articleName} is not available.`;
        }

        let guest = this.guests.find(x => x.guestName === guestName);
        if (guest == undefined) {
            return 'This guest is not invited.';
        }
        else if (guest.points < this.possibleArticles[articleModel]) {
            return 'You need to more points to purchase the article.';
        }
        else if (guest.points >= this.possibleArticles[articleModel]) {
            guest.points -= this.possibleArticles[articleModel];
            article.quantity -= 1;
            guest.purchaseArticle += 1;
        }

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[articleModel]} points.`;
    }

    showGalleryInfo(criteria) {
        let result = [];
        switch (criteria) {
            case 'article':
                result.push('Articles information:');
                this.listOfArticles.forEach(x => result.push(`${x.articleModel} - ${x.articleName} - ${x.quantity}`));
                return result.join('\n');
            case 'guest':
                result.push('Guests information:');
                this.guests.forEach(x => result.push(`${x.guestName} - ${x.purchaseArticle}`));
                return result.join('\n');
        }
    }
}

let artGallery = new ArtGallery("Stamat");
console.log(artGallery.addArticle("picture", "shediovur", "1"));
console.log(artGallery.addArticle("picture", "shediovurDve", "5"));
console.log(artGallery.addArticle("picture", "shediovurDve", "5"));

console.log(artGallery.inviteGuest("johny", "Vip"));
console.log(artGallery.inviteGuest("Gordon", "Middle"));
console.log(artGallery.inviteGuest("Shane", "nekuv"));

console.log(artGallery.buyArticle("picture", "shediovur", "johny"))