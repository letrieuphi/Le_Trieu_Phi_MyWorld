'use client';
import { useState } from 'react';
import { profile } from '@/content/profile';
import { asset } from '@/lib/site';
import { T, useLocale } from './locale';
export function Portrait({ size = 'small' }: { size?: 'small' | 'about' }) {
  const [failed, setFailed] = useState(false);
  const { t } = useLocale();
  return <figure className={`portrait portrait-${size}`}>
    <div className="portrait-frame">{profile.portraitAvailable && !failed ?
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(profile.profileImage)} alt={t('Portrait of Triệu Phi')} width={600} height={750} onError={() => setFailed(true)} />
      : <div className="portrait-placeholder"><span><T>PORTRAIT</T></span><span><T>ADD IMAGE</T></span></div>}
    </div><figcaption><span>{profile.name.toUpperCase()} / {profile.nickname.toUpperCase()}</span><span><T>HO CHI MINH CITY</T></span></figcaption>
  </figure>;
}
