(function() {
  'use strict';
  var app = angular.module('WonderfulWorld');
  app.value('PlacesDatabase', [
    {
      id: 'effbdc03-c5dd-4535-981a-3fd8301f693d',
      name: 'Haifoss Waterfall',
      country: 'Iceland',
      tags: ['Nature', 'Waterfall', 'Nordic'],
      image: 'haifos_waterfall.jpg',
      link: 'https://en.wikipedia.org/wiki/H%C3%A1ifoss',
      description: 'The waterfall Háifoss is situated near the volcano Hekla in the south of Iceland. The river Fossá, a tributary of Þjórsá, drops here from a height of 122 m. This is the second highest waterfall of the island.'
    },
    {
      id: 'f15e77c7-0d2e-4ae3-a1cf-543d609fa111',
      name: 'Sơn Đoòng Cave',
      country: 'Vietnam',
      tags: ['Nature', 'Cave'],
      image: 'hang-son-doong.jpg',
      link: 'https://en.wikipedia.org/wiki/Hang_S%C6%A1n_%C4%90o%C3%B2ng',
      description: 'According to the Limberts, the cave is five times larger than nearby caves like Phong Nha Cave and Hang En, the third largest cave in the world previously considered the biggest cave in Vietnam. The main passage in Sơn Đoòng is more than 5 kilometres (3.1 mi) long, 200 metres (660 ft) high and 150 metres (490 ft) wide.'
    },
    {
      id: '9cb42501-50f8-4160-a927-b09c4f552639',
      name: 'Skógafoss',
      country: 'Iceland',
      tags: ['Nature', 'Waterfall', 'Nordic'],
      image: 'skogafoss_waterfall.jpg',
      link: 'https://en.wikipedia.org/wiki/Sk%C3%B3gafoss',
      description: 'Skógafoss is a waterfall situated on the Skógá River in the south of Iceland at the cliffs of the former coastline. After the coastline had receded seaward (it is now at a distance of about 5 kilometres (3.1 miles) from Skógar), the former sea cliffs remained, parallel to the coast over hundreds of kilometres, creating together with some mountains a clear border between the coastal lowlands and the Highlands of Iceland.'
    },
    {
      id: '3f3eb581-09db-441e-afc0-385e0023f692',
      name: 'Vinicunca',
      country: 'Peru',
      tags: ['Nature', 'Mountains'],
      image: 'rainbow_mountains.jpg',
      link: 'http://www.flashpackerconnect.com/',
      description: '"Rainbow Mountain" created by volcanoes.'
    },
    {
      id: 'd8a24a8d-fc8b-49e0-a851-9b23a8ac9188',
      name: 'Eilean Donan',
      country: 'Scotland',
      tags: ['Nature', 'Man-Made', 'Castle', 'Island'],
      image: 'eilean_donan.jpg',
      link: 'http://www.eileandonancastle.com/',
      description: 'Eilean Donan is a small tidal island where three lochs meet, Loch Duich, Loch Long and Loch Alsh, in the western Highlands of Scotland. A picturesque castle that frequently appears in photographs, film and television dominates the island, which lies about 1 kilometre (0.62 mi) from the village of Dornie. Since the castle\'s restoration in the early 20th century, a footbridge has connected the island to the mainland.'
    },
    {
      id: '861c0fbe-89b8-40f0-afd8-dee774d867d6',
      name: 'Ellison\'s Cave',
      country: 'United States of America',
      tags: ['Nature', 'Cave'],
      image: 'ellisons_cave.jpg',
      link: 'https://roadtrippers.com/us/lafayette-ga/nature/ellisons-cave?lat=40.80972&lng=-96.67528&z=5',
      description: 'This pit cave is located on the Pigeon Mountain range on the Northwest of Georgia. It is the 12th deepest cave in the the US, extending over 12 miles and 1063 feet vertically. There are over 7 routes to reach the bottom of the cave.'
    },
    {
      id: 'e5ca2c7f-293e-45d1-8fb9-eaa294ba6cb5',
      name: 'Kuramathi Island',
      country: 'Maldives',
      tags: ['Nature', 'Beach', 'Island'],
      image: 'kuramathi_island.jpg',
      link: 'https://en.wikipedia.org/wiki/Kuramathi',
      description: 'Kuramathi is one of eight holiday resort islands owned and managed by Universal Enterprises Limited, a Maldivian company. There is a sandbank on the west of the island which is only visible when the tide is low.'
    },
    {
      id: 'aa37d769-7ea6-4063-867c-087be646f3ad',
      name: 'Dunbar Rock',
      country: 'Honduras',
      tags: ['Man-Made', 'Resort', 'Luxury', 'Island'],
      image: 'dunbar_rock.jpg',
      link: 'http://dunbarrock.com/',
      description: 'This beautiful historical landmark was once used as a mooring for the famous pirate Blackbeard. Local legend has it that there is buried treasure on the island. When the original owner was constructing the villas, he discovered a hidden cave on the island. He found many pieces of pre-Colombian pottery, but sadly no treasure. But he started construction on what would soon become a new jewel in the Caribbean.'
    },
    {
      id: '02c117c8-500f-47ba-a479-fac6bef7a567',
      name: 'Neuschwanstein Castle',
      country: 'Germany',
      tags: ['Man-Made', 'Castle'],
      image: 'neuschwanstein_castle.jpg',
      link: 'https://en.wikipedia.org/wiki/Neuschwanstein_Castle',
      description: 'Neuschwanstein Castle is a nineteenth-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau near Füssen in southwest Bavaria, Germany. The palace was commissioned by Ludwig II of Bavaria as a retreat and as an homage to Richard Wagner. Ludwig paid for the palace out of his personal fortune and by means of extensive borrowing, rather than Bavarian public funds.'
    },
    {
      id: '0f101629-bdcb-4d62-b8b0-7d0bdacfa156',
      name: 'Odda',
      country: 'Norway',
      tags: ['Man-Made', 'Town', 'Nordic'],
      image: 'odda.jpg',
      link: 'https://en.wikipedia.org/wiki/Odda',
      description: 'Odda municipality is very mountainous and the settlements are all located in valleys. Because of the many mountains, there are many large waterfalls including Låtefossen, Espelandsfossen, and Tyssestrengene. There are also many large lakes such as Sandvinvatnet, Votna, Valldalsvatnet, Røldalsvatnet, Ringedalsvatnet, Langavatnet, and parts of Ståvatn.'
    },
    {
      id: '60229a3c-f54e-47af-8194-77516a69e49a',
      name: 'Durban Island',
      country: 'Canada',
      tags: ['Nature', 'Island', 'Nordic'],
      image: 'durban_island.jpg',
      link: 'https://en.wikipedia.org/wiki/Durban_Island',
      description: 'Durban Island is a Canadian Arctic island located in Nunavut, Canada. It is one of Baffin Island\'s northeast offshore islands within Davis Strait\'s Merchants Bay. It is 36 km2 (14 sq mi) in size. Durban Harbour is on the island\'s southeast facing side. Nearby can be found the larger Padloping Island, and Auyuittuq National Park Reserve is also to the west on Baffin Island.'
    },
    {
      id: '0e03c3b1-34ac-4893-a7b2-d15a757854ed',
      name: 'Sorrento Beach',
      country: 'Australia',
      tags: ['Nature', 'Beach'],
      image: 'sorrento_beach.jpg',
      link: 'https://en.wikipedia.org/wiki/Sorrento,_Victoria',
      description: 'Sorrento is a township in Victoria, Australia, located on the shores of Port Phillip on the Mornington Peninsula, about one and a half hours by car south of Melbourne. It is a largely upper-class, seaside resort area, but is also a quiet seaside township in the off-peak months of the year. It was named by the Italian founders after the southern Italian town.'
    },
    {
      id: '6a274b7f-f1c1-4c98-9b99-1d51c1f78a5e',
      name: 'Chinatown NYC',
      country: 'United States of America',
      tags: ['Man-Made', 'Asian', 'City'],
      image: 'chinatown_nyc.jpg',
      link: 'https://www.tripadvisor.ca/Attraction_Review-g60763-d181825-Reviews-Chinatown-New_York_City_New_York.html',
      description: 'One of the most iconic chinatowns in the world.'
    }
  ]);
})();
