var ads = {
    interstitialAlreadyDownloaded: false,
    bannerAlreadyDownloaded: false
};

// BANNER
Cocoon.Ad.banner.on("shown" , function(){
	ads.bannerAlreadyDownloaded = false;
    console.log("Banner shown!");
    Cocoon.Ad.loadBanner();
});
Cocoon.Ad.banner.on("ready" , function(){
    Cocoon.Ad.setBannerLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
    console.log("Banner ready");
    ads.bannerAlreadyDownloaded = true;
});
Cocoon.Ad.banner.on("hidden" , function(){
    console.log("Banner hidden!");
});


// INTERSTITIAL
Cocoon.Ad.interstitial.on("shown" , function(){
    ads.interstitialAlreadyDownloaded = false;
    Cocoon.Ad.loadInterstitial();
    console.log("Interstitial shown!");
});
Cocoon.Ad.interstitial.on("ready" , function(){
	ads.interstitialAlreadyDownloaded = true;
	console.log("Interstitial ready");
});
Cocoon.Ad.interstitial.on("hidden" , function(){
    console.log("Interstitial hidden!");
});


// Fetch a banner, the above callbacks will handle it.
Cocoon.Ad.loadBanner();

// Fetch the interstitial, the above callbacks will handle it.
Cocoon.Ad.loadInterstitial();
