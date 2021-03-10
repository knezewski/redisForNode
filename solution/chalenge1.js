const findAll = async () => {
   // START CHALLENGE #1
   const client = redis.getClient();
     
   const siteIds = await client.smembersAsync(keyGenerator.getSiteIDsKey());
   const sites = [];
     
   for (const siteId of siteIds) {
     const siteHash = await client.hgetallAsync(siteId);
     
     if (siteHash) {
       // Call remap to remap the flat key/value representation
       // from the Redis hash into the site domain object format,
       // and convert any fields that a numerical from the Redis
       // string representations.
       sites.push(remap(siteHash));
     }
   }
     
   return sites;
   /