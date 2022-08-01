const values = ['run_results_accessories_all.json',
                'run_results_banners.json',
                'run_results_categories.json',
                'run_results_family_all.json',
                'run_results_graduate_all.json',
                'run_results_mens_all.json',
                'run_results_mit_all.json',
                'run_results_new_arrivals_all.json',
                'run_results_womens_all.json'
               ];
const index = 8;

const data = require('../../data/oldFiles/' + values[index]);
const fs = require('fs');

let fixPrices = (price) => {
    let priceNum = parseFloat(price.substring(1));
    if (priceNum <= 1)
    {
        priceNum += 0.5;
    }
    else if (priceNum <= 3)
    {
        priceNum += 1;
    }
    else if (priceNum <= 5)
    {
        priceNum += 1.5;
    }
    else if (priceNum <= 10)
    {
        priceNum += 2;
    }
    else if (priceNum <= 30)
    {
        priceNum += 5;
    }
    else if (priceNum <= 50)
    {
        priceNum += 10;
    }
    else if (priceNum <= 70)
    {
        priceNum += 15;
    }
    else if (priceNum <= 100)
    {
        priceNum += 25;
    }
    else if (priceNum <= 200)
    {
        priceNum += 30;
    }
    else
    {
        priceNum += 50;
    }
    return "$" + priceNum.toFixed(2);
}

if (index == 2)
{
    for(let i = 0; i < data.categories.length; i++)
    {
        if((i != 3) && (i != 5))
        {
            for(let j = 0; j < data.categories[i].best_sellers.length; j++)
            {
                let price = data.categories[i].best_sellers[j].price;
                data.categories[i].best_sellers[j].price = fixPrices(price);
            }
        }
    }
} else {
    for(let i = 0; i < data.selection1.length; i++)
    {
        let price = data.selection1[i].price;
        data.selection1.price = fixPrices(price);
    }    
}

fs.writeFile('../../data/' + values[index], JSON.stringify(data), function(err, result) {
    if(err) console.log('error', err);
});

console.log('Done');