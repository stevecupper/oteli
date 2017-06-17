/* GET 'about' page */
module.exports.about = function(req, res) {
    res.render('about-text', {
        title: 'About Oteli',
        content: ' Oteli a été créé pour aider les gens à trouver un hotel calme et confortable!\n\n' +
            'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam ' +
            'sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis ' +
            'purus quis eros adipiscing tristique. Proin posuere semper tellus, id ' +
            'placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, ' +
            'accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.'
    });
};