import * as React from 'react';
import { Text, View, StyleSheet, Button,LogBox } from 'react-native';
import Constants from 'expo-constants';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
    AdMob
} from 'expo-ads-admob'

LogBox.ignoreAllLogs(false)

export default class App extends React.Component {
    componentDidMount() {
        this.setTestID
    }

    setTestID = () => {
         setTestDeviceIDAsync('EMULATOR');
    }

    getAdId = () =>{
        const adUnitID = Platform.select({
            // https://developers.google.com/admob/ios/test-ads
            ios: 'ca-app-pub-3940256099942544/1712485313',
            // https://developers.google.com/admob/android/test-ads
            android: 'ca-app-pub-3940256099942544/5224354917',
        });
        return adUnitID
    }


    showInterstitialAd = async () => {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        await AdMobInterstitial.showAdAsync();
  };
/**/
  showRewardedAd = async () => {
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Device ID: {Constants.deviceId}</Text>
          <Button
              onPress={this.showInterstitialAd}
              title="Interstitial ad"
          />
          <Button
              onPress={this.showRewardedAd}
              title="Rewarded ad"
          />
          <Text>AdMobBanner</Text>
          <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
              servePersonalizedAds // true or false
              onDidFailToReceiveAdWithError={this.bannerError}
          />
          <Text>PublisherBanner</Text>

          <PublisherBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdMobDispatchAppEvent={this.adMobEvent}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
