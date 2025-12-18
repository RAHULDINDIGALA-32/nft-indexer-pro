export function resolveNFTImage(nft) {
  const candidates = [
    nft.media?.[0]?.gateway,
    nft.rawMetadata?.image,
    nft.rawMetadata?.image_url,
  ];

  for (const url of candidates) {
    if (!url) continue;
    if (url.startsWith('ipfs://')) {
      return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return url;
  }

  return 'https://via.placeholder.com/400?text=No+Image';
}
