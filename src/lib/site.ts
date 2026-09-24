export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://letrieuphi.github.io/Le_Trieu_Phi_MyWorld').replace(/\/$/, '');
export const asset = (path: string) => path.startsWith('/') ? `${basePath}${path}` : path;
