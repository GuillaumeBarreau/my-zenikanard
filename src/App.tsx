import React, { useState } from 'react';
import cn from 'classnames';

import {ReactComponent as Body} from './assets/shapes/body.svg';
import {ReactComponent as Head} from './assets/shapes/head.svg';
import {ReactComponent as Floor} from './assets/shapes/floor.svg';
import {ReactComponent as Random} from './icons/random.svg';
import {ReactComponent as Trash} from './icons/trash.svg';
import {ReactComponent as ByZenika} from './icons/byzenika.svg';


import getData, {DEFAULT_ASSETS, Asset, SelectedAssets} from './data';
import styles from './App.module.css';
import AssetButton from './components/AssetButton';

const data = getData();

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [assets, setAssets] = useState<SelectedAssets>(DEFAULT_ASSETS);
  const [category, setCategory] = useState<number>(0);

  const addAssetToLayer = (selected: Asset | undefined) => {
    const layer = data[category].layer;
    setAssets({
      ...assets,
      [layer]: selected?.asset,
    })
  }

  const getLayerAsset = (layerId: string) => {
    const Asset = assets[layerId];
    if (!Asset) return undefined;
    return <Asset />
  }

  const isAssetsSelected = (currentAsset?: Asset) => {
    const layer = data[category].layer;
    if (!currentAsset) return !assets[layer];
    const CurrentAsset = currentAsset.asset;
    return assets[layer] === CurrentAsset;
  }

  const randomize = () => {
    const assets: SelectedAssets = {};
    data.forEach(category => {
      const index = getRandomInt(category.assets.length + 1)
      if (index === category.assets.length) {
        assets[category.layer] = undefined;
      } else {
        assets[category.layer] = category.assets[index].asset;
      }
    })
    setAssets(assets);
  }

  const reset = () => setAssets(DEFAULT_ASSETS);

  return (
    <div className={styles.app}>
      <div className={styles.background} />
      <div className={styles.header}>
        <div className={styles.title}>
          Pimp My <span className={styles.titleInner}>Duck</span>
          <ByZenika className={styles.byZenika}/>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <svg viewBox="0 0 2000 2000">
            <Floor />
            <Body />
            {getLayerAsset('body-tatoo')}
            {getLayerAsset('wear')}
            {getLayerAsset('acc')}
            <Head />
            {getLayerAsset('face')}
            {getLayerAsset('eye')}
            {getLayerAsset('hair')}
            {getLayerAsset('glasses')}
            {getLayerAsset('mouth')}
            {getLayerAsset('hat')}
            {getLayerAsset('eye-wear')}
          </svg>
        </div>
        <div className={cn(styles.categories, styles.categoriesLeft)}>
          <div className={styles.categoriesInner}>
            {data.map((c, index) => {
              if (!c.assets) return undefined;
              return <button key={index} onClick={() => setCategory(index)}>{c.name}</button>
            })}
          </div>
        </div>
        <div className={cn(styles.categories, styles.categoriesRight)}> 
          <div className={styles.categoriesInner}> 
            <AssetButton 
              onClick={addAssetToLayer}
              selected={isAssetsSelected(undefined)}
            />
            {data[category].assets?.map((asset, index) => (
              <AssetButton 
                key={index}
                asset={asset}
                onClick={addAssetToLayer}
                selected={isAssetsSelected(asset)}
              />
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.circle} onClick={reset}>
            <Trash height="24px" width="24px" />
          </button>
          <button className={styles.circle} onClick={randomize}>
            <Random height="24px" width="24px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;