/* GET 'home' page */
module.exports.homelist = function(req, res) {
    res.render('hotels-list', {
        title: 'Oteli - trouvez le meilleur Hôtel',
        pageHeader: {
            title: 'Oteli',
            strapline: 'Trouvez le meilleur Hôtel dans l\'alentour'
        },
        sidebar: "Vous recherchez un Hôtel accueillant et propre? Vous voulez disposer d'un buffet de qualité, et du Wi-Fi gratuit? Oteli vous aidera à trouver ce qu'il vous faut.",
        hotels: [{
                name: 'Hôtel Palm Beach',
                address: '1, Bd de la Republique B.P. 2252, Lomé - Togo',
                rating: 3,
                facilities: ['Plage', 'Piscine', 'TV', 'Navette', 'Restaurant', 'Wi-Fi'],
                distance: '100m'
            }, {
                name: 'Hôtel Ibis Lome Centre',
                address: 'Avenue du Général de Gaulle, 0000 Lomé - Togo',
                rating: 3,
                facilities: ['Piscine', 'TV', 'Navette', 'Restaurant', 'Wi-Fi'],
                distance: '150m'
            },
            {
                name: 'Hôtel Robinson Plage',
                address: 'Zone portuaire, Lomé - Togo',
                rating: 3,
                facilities: ['Plage', 'TV', 'Navette', 'Restaurant', 'Wi-Fi'],
                distance: '200m'
            },
            {
                name: 'Hôtel du Golf',
                address: '10 Avenue Sylvanus Olympio, Lomé - Togo',
                rating: 3,
                facilities: ['Plage', 'Piscine', 'TV', 'Navette', 'Restaurant', 'Wi-Fi'],
                distance: '500m'
            }
        ]
    });
};
/* GET 'Hotel info' page */
module.exports.hotelInfo = function(req, res) {
    res.render('hotel-info', {
        title: 'Hotel Palm Beach',
        pageHeader: { title: 'Hôtel Palm Beach' },
        sidebar: {
            context: 'est sur Oteli parce qu\'il est susceptible de vous intéresser.',
            callToAction: 'Si vous avez déjà été ici et que vous aviez aimé ou pas, aidez nous en donnant votre opinion.'
        },
        hotel: {
            name: 'Hotel Palm Beach',
            address: '1, Bd de la Republique B.P. 2252, Lomé - Togo',
            rating: 4,
            facilities: ['Plage', 'Piscine', 'TV', 'Navette', 'Restaurant', 'Wi-Fi'],
            coords: { lat: 6.1544514, lng: 1.2328492 },
            openingTimes: [{
                days: 'Lundi - Jeudi',
                opening: '07:00',
                closing: '19:00',
                closed: false
            }, {
                days: 'Vendredi - samedi',
                opening: '10:00',
                closing: '23:00',
                cloosed: false
            }, {
                days: 'Dimanche',
                closed: true
            }],
            reviews: [{
                author: 'Bernard Adanlessossi',
                rating: 5,
                timestamp: '16 December 2016',
                reviewText: 'Jolie place pour se relaxer. Les chambres étaient propre et le lit agréable.'
            }, {
                author: 'Albert Einstein',
                rating: 3,
                timestamp: '26 December 2016',
                reviewText: 'Le bar était fantastique. Ambiance idéale pour la drague.Ici j\'ai trouvé la formule e=mc au carré!'
            }, {
                author: 'Yaya Djameh',
                rating: 2,
                timestamp: '16 January 2017',
                reviewText: 'Cette place est une honte pour toute l\'Afrique.'
            }]
        }
    });
};
/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('hotel-review-form', {
        title: 'Commente Hotel Palm Beach sur Oteli',
        pageHeader: { title: 'Review Hotel Palm Beach' }
    });
};