import { $adCampaigns } from '@/stores/AdsStore'
import type { AdCampaign } from '@/types';
import { useStore } from '@nanostores/react'
import React, { useEffect, useState } from 'react'

import styles from '@/styles/Ad.module.css';
import { getAspectRatioClass } from '@/utils';

export const RandomAd = () => {
  const ads = useStore($adCampaigns);
  const [ad, setAd] = useState<AdCampaign | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * ads.length);
    const ad = ads[index];

    setAd(ad);
  }, [ads]);

  return (
    <>
      {
        ad && <div className={`p-4 ${styles.aspectContainer} ${getAspectRatioClass(ad.width, ad.height)}`}>
          <img  src={ad.url} alt={ad.alt} id={ad.id} className="rounded-md h-auto" />
        </div>
      }
    </>
  )
}
