<template>
    <Header />
    <logo-search/>

    <div class="contentStander mt-1 w-90">
        <!-- <div class="" v-for="item in container[page_index]" > -->
        <div class="" v-for="item in paginatedData" :key="item.id" >
            <item-experience :item="item" />
        </div>
            
    
        <pagination v-if="allExperiences.length > 0" v-model="page_index" :records="allExperiences.length" :per-page="page_size" @paginate="myCallback"/>
    </div>

    


            <!-- <span>{{ item.id }}</span>
            <span>{{ item.first_name }}</span>
            <span>{{ item.last_name }}</span>
            <span>{{ item.email }}</span>
            <span>{{ item.gender }}</span>
            <span>{{ item.ip_address }}</span> -->

    <Footer />
</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import LogoSearch from "@/components/LogoSearch.vue"
    // import ItemExperienceSec from "@/components/ItemExperienceSec.vue"
    import ItemExperience from "@/components/ItemExperience.vue"
    import Pagination from 'v-pagination-3';

    export default {
        data() {
            return {
                data:[
                    {
                    "id": 1,
                    "first_name": "Manny",
                    "last_name": "Gillet",
                    "email": "mgillet0@discovery.com",
                    "gender": "Male",
                    "ip_address": "71.156.35.247"
                    }, {
                    "id": 2,
                    "first_name": "Ruggiero",
                    "last_name": "Crippes",
                    "email": "rcrippes1@webmd.com",
                    "gender": "Male",
                    "ip_address": "157.13.24.79"
                    }, {
                    "id": 3,
                    "first_name": "Janifer",
                    "last_name": "Ballance",
                    "email": "jballance2@blogger.com",
                    "gender": "Polygender",
                    "ip_address": "169.125.198.250"
                    }, {
                    "id": 4,
                    "first_name": "Cello",
                    "last_name": "Cuttles",
                    "email": "ccuttles3@accuweather.com",
                    "gender": "Male",
                    "ip_address": "110.249.8.33"
                    }, {
                    "id": 5,
                    "first_name": "Vilma",
                    "last_name": "Adame",
                    "email": "vadame4@uiuc.edu",
                    "gender": "Female",
                    "ip_address": "177.252.40.86"
                    }, {
                    "id": 6,
                    "first_name": "Enrika",
                    "last_name": "Cadwallader",
                    "email": "ecadwallader5@usda.gov",
                    "gender": "Female",
                    "ip_address": "60.124.28.49"
                    }, {
                    "id": 7,
                    "first_name": "Slade",
                    "last_name": "Nixon",
                    "email": "snixon6@salon.com",
                    "gender": "Male",
                    "ip_address": "130.220.217.17"
                    }, {
                    "id": 8,
                    "first_name": "Emmy",
                    "last_name": "Rowthorne",
                    "email": "erowthorne7@mac.com",
                    "gender": "Male",
                    "ip_address": "121.147.172.133"
                    }, {
                    "id": 9,
                    "first_name": "Nels",
                    "last_name": "Sharp",
                    "email": "nsharp8@bandcamp.com",
                    "gender": "Male",
                    "ip_address": "72.211.171.38"
                    }, {
                    "id": 10,
                    "first_name": "Travers",
                    "last_name": "Curman",
                    "email": "tcurman9@ocn.ne.jp",
                    "gender": "Male",
                    "ip_address": "0.188.229.254"
                    }, {
                    "id": 11,
                    "first_name": "Bunnie",
                    "last_name": "Fawley",
                    "email": "bfawleya@businessinsider.com",
                    "gender": "Female",
                    "ip_address": "93.102.56.43"
                    }, {
                    "id": 12,
                    "first_name": "Cullan",
                    "last_name": "Laytham",
                    "email": "claythamb@slideshare.net",
                    "gender": "Male",
                    "ip_address": "151.221.165.245"
                    }, {
                    "id": 13,
                    "first_name": "Beverlie",
                    "last_name": "Penvarne",
                    "email": "bpenvarnec@unesco.org",
                    "gender": "Female",
                    "ip_address": "155.173.164.248"
                    }, {
                    "id": 14,
                    "first_name": "Kelsey",
                    "last_name": "Beckitt",
                    "email": "kbeckittd@cocolog-nifty.com",
                    "gender": "Male",
                    "ip_address": "201.76.206.165"
                    }, {
                    "id": 15,
                    "first_name": "Olin",
                    "last_name": "Shankle",
                    "email": "oshanklee@ifeng.com",
                    "gender": "Male",
                    "ip_address": "195.171.111.109"
                    }, {
                    "id": 16,
                    "first_name": "Teddi",
                    "last_name": "Malacrida",
                    "email": "tmalacridaf@shareasale.com",
                    "gender": "Female",
                    "ip_address": "101.140.137.240"
                    }, {
                    "id": 17,
                    "first_name": "Carson",
                    "last_name": "Stopford",
                    "email": "cstopfordg@netscape.com",
                    "gender": "Male",
                    "ip_address": "98.249.233.97"
                    }, {
                    "id": 18,
                    "first_name": "Marty",
                    "last_name": "McReidy",
                    "email": "mmcreidyh@stumbleupon.com",
                    "gender": "Male",
                    "ip_address": "203.94.1.147"
                    }, {
                    "id": 19,
                    "first_name": "Elga",
                    "last_name": "Durie",
                    "email": "eduriei@webmd.com",
                    "gender": "Female",
                    "ip_address": "190.98.76.149"
                    }, {
                    "id": 20,
                    "first_name": "Jedd",
                    "last_name": "Paladino",
                    "email": "jpaladinoj@goo.ne.jp",
                    "gender": "Genderfluid",
                    "ip_address": "203.157.134.82"
                    }, {
                    "id": 21,
                    "first_name": "Yancy",
                    "last_name": "Wilce",
                    "email": "ywilcek@slate.com",
                    "gender": "Male",
                    "ip_address": "195.98.146.165"
                    }, {
                    "id": 22,
                    "first_name": "Mair",
                    "last_name": "McNab",
                    "email": "mmcnabl@netscape.com",
                    "gender": "Female",
                    "ip_address": "169.8.49.123"
                    }, {
                    "id": 23,
                    "first_name": "Morry",
                    "last_name": "Burgane",
                    "email": "mburganem@yellowbook.com",
                    "gender": "Male",
                    "ip_address": "223.33.187.177"
                    }, {
                    "id": 24,
                    "first_name": "Angelico",
                    "last_name": "Chansonnau",
                    "email": "achansonnaun@bravesites.com",
                    "gender": "Male",
                    "ip_address": "30.73.167.253"
                    }, {
                    "id": 25,
                    "first_name": "Ardath",
                    "last_name": "Marfield",
                    "email": "amarfieldo@dmoz.org",
                    "gender": "Female",
                    "ip_address": "76.151.159.165"
                    }, {
                    "id": 26,
                    "first_name": "Page",
                    "last_name": "Moyles",
                    "email": "pmoylesp@indiegogo.com",
                    "gender": "Male",
                    "ip_address": "182.73.202.111"
                    }, {
                    "id": 27,
                    "first_name": "Boote",
                    "last_name": "Dargie",
                    "email": "bdargieq@goo.gl",
                    "gender": "Male",
                    "ip_address": "123.87.5.131"
                    }, {
                    "id": 28,
                    "first_name": "Shurlock",
                    "last_name": "Bartoszinski",
                    "email": "sbartoszinskir@wikia.com",
                    "gender": "Male",
                    "ip_address": "31.152.115.159"
                    }, {
                    "id": 29,
                    "first_name": "Jourdan",
                    "last_name": "Cruise",
                    "email": "jcruises@bloglovin.com",
                    "gender": "Female",
                    "ip_address": "56.45.17.87"
                    }, {
                    "id": 30,
                    "first_name": "Minnaminnie",
                    "last_name": "Chellenham",
                    "email": "mchellenhamt@ocn.ne.jp",
                    "gender": "Female",
                    "ip_address": "185.180.182.176"
                    }, {
                    "id": 31,
                    "first_name": "Gusti",
                    "last_name": "Harmond",
                    "email": "gharmondu@bing.com",
                    "gender": "Female",
                    "ip_address": "198.153.3.196"
                    }, {
                    "id": 32,
                    "first_name": "Ardeen",
                    "last_name": "Feuell",
                    "email": "afeuellv@etsy.com",
                    "gender": "Genderfluid",
                    "ip_address": "65.159.204.69"
                    }, {
                    "id": 33,
                    "first_name": "Erhart",
                    "last_name": "Fisbey",
                    "email": "efisbeyw@comcast.net",
                    "gender": "Male",
                    "ip_address": "171.36.202.140"
                    }, {
                    "id": 34,
                    "first_name": "Kynthia",
                    "last_name": "Rose",
                    "email": "krosex@tinypic.com",
                    "gender": "Genderfluid",
                    "ip_address": "145.94.64.185"
                    }, {
                    "id": 35,
                    "first_name": "Rickert",
                    "last_name": "O'Fihily",
                    "email": "rofihilyy@huffingtonpost.com",
                    "gender": "Male",
                    "ip_address": "209.60.168.186"
                    }, {
                    "id": 36,
                    "first_name": "Silvana",
                    "last_name": "Downage",
                    "email": "sdownagez@posterous.com",
                    "gender": "Female",
                    "ip_address": "107.120.66.105"
                    }, {
                    "id": 37,
                    "first_name": "Mersey",
                    "last_name": "Monks",
                    "email": "mmonks10@pbs.org",
                    "gender": "Female",
                    "ip_address": "54.176.185.60"
                    }, {
                    "id": 38,
                    "first_name": "Sebastian",
                    "last_name": "Cousin",
                    "email": "scousin11@nps.gov",
                    "gender": "Male",
                    "ip_address": "155.35.17.174"
                    }, {
                    "id": 39,
                    "first_name": "Dinny",
                    "last_name": "Dawid",
                    "email": "ddawid12@mail.ru",
                    "gender": "Female",
                    "ip_address": "58.157.105.141"
                    }, {
                    "id": 40,
                    "first_name": "Mose",
                    "last_name": "Richly",
                    "email": "mrichly13@google.ru",
                    "gender": "Male",
                    "ip_address": "62.144.252.117"
                    }, {
                    "id": 41,
                    "first_name": "Cecilius",
                    "last_name": "Caughtry",
                    "email": "ccaughtry14@moonfruit.com",
                    "gender": "Male",
                    "ip_address": "68.237.192.103"
                    }, {
                    "id": 42,
                    "first_name": "Horatio",
                    "last_name": "Skegg",
                    "email": "hskegg15@ovh.net",
                    "gender": "Male",
                    "ip_address": "226.248.87.127"
                    }, {
                    "id": 43,
                    "first_name": "Thorvald",
                    "last_name": "Drewell",
                    "email": "tdrewell16@google.com.hk",
                    "gender": "Male",
                    "ip_address": "137.62.216.16"
                    }, {
                    "id": 44,
                    "first_name": "Tammy",
                    "last_name": "Sherrard",
                    "email": "tsherrard17@miitbeian.gov.cn",
                    "gender": "Bigender",
                    "ip_address": "41.41.200.170"
                    }, {
                    "id": 45,
                    "first_name": "Julie",
                    "last_name": "Alfonsetto",
                    "email": "jalfonsetto18@un.org",
                    "gender": "Male",
                    "ip_address": "239.198.168.155"
                    }, {
                    "id": 46,
                    "first_name": "Lance",
                    "last_name": "Whiteson",
                    "email": "lwhiteson19@newsvine.com",
                    "gender": "Male",
                    "ip_address": "23.16.117.130"
                    }, {
                    "id": 47,
                    "first_name": "Justin",
                    "last_name": "Hoodspeth",
                    "email": "jhoodspeth1a@desdev.cn",
                    "gender": "Male",
                    "ip_address": "67.254.182.89"
                    }, {
                    "id": 48,
                    "first_name": "Kaitlin",
                    "last_name": "Hugo",
                    "email": "khugo1b@irs.gov",
                    "gender": "Female",
                    "ip_address": "167.79.170.179"
                    }, {
                    "id": 49,
                    "first_name": "Sidnee",
                    "last_name": "Gentery",
                    "email": "sgentery1c@apache.org",
                    "gender": "Polygender",
                    "ip_address": "159.136.242.200"
                    }, {
                    "id": 50,
                    "first_name": "Agustin",
                    "last_name": "Nisby",
                    "email": "anisby1d@posterous.com",
                    "gender": "Male",
                    "ip_address": "254.205.173.7"
                    }, {
                    "id": 51,
                    "first_name": "Dorelle",
                    "last_name": "Ramiro",
                    "email": "dramiro1e@ameblo.jp",
                    "gender": "Female",
                    "ip_address": "198.1.125.198"
                    }, {
                    "id": 52,
                    "first_name": "Ronda",
                    "last_name": "Giddy",
                    "email": "rgiddy1f@senate.gov",
                    "gender": "Female",
                    "ip_address": "135.3.108.70"
                    }, {
                    "id": 53,
                    "first_name": "Brittaney",
                    "last_name": "Sharpling",
                    "email": "bsharpling1g@usnews.com",
                    "gender": "Female",
                    "ip_address": "105.211.214.139"
                    }, {
                    "id": 54,
                    "first_name": "Lindy",
                    "last_name": "Reston",
                    "email": "lreston1h@wikispaces.com",
                    "gender": "Female",
                    "ip_address": "20.117.193.187"
                    }, {
                    "id": 55,
                    "first_name": "Conchita",
                    "last_name": "Kemm",
                    "email": "ckemm1i@bloglines.com",
                    "gender": "Female",
                    "ip_address": "85.160.29.6"
                    }, {
                    "id": 56,
                    "first_name": "Evan",
                    "last_name": "Pettie",
                    "email": "epettie1j@walmart.com",
                    "gender": "Male",
                    "ip_address": "26.41.250.42"
                    }, {
                    "id": 57,
                    "first_name": "Melinde",
                    "last_name": "Gurley",
                    "email": "mgurley1k@unesco.org",
                    "gender": "Female",
                    "ip_address": "68.97.132.98"
                    }, {
                    "id": 58,
                    "first_name": "Shanan",
                    "last_name": "Bateup",
                    "email": "sbateup1l@slashdot.org",
                    "gender": "Male",
                    "ip_address": "136.211.158.243"
                    }, {
                    "id": 59,
                    "first_name": "Harland",
                    "last_name": "Beatey",
                    "email": "hbeatey1m@guardian.co.uk",
                    "gender": "Male",
                    "ip_address": "29.219.178.176"
                    }, {
                    "id": 60,
                    "first_name": "Desi",
                    "last_name": "Wynrehame",
                    "email": "dwynrehame1n@t.co",
                    "gender": "Genderqueer",
                    "ip_address": "65.25.226.142"
                    }, {
                    "id": 61,
                    "first_name": "Dannye",
                    "last_name": "Swannie",
                    "email": "dswannie1o@myspace.com",
                    "gender": "Female",
                    "ip_address": "142.96.163.100"
                    }, {
                    "id": 62,
                    "first_name": "Thomas",
                    "last_name": "Poltone",
                    "email": "tpoltone1p@nymag.com",
                    "gender": "Male",
                    "ip_address": "152.108.208.220"
                    }, {
                    "id": 63,
                    "first_name": "Melisent",
                    "last_name": "Sellwood",
                    "email": "msellwood1q@rakuten.co.jp",
                    "gender": "Female",
                    "ip_address": "50.181.231.219"
                    }, {
                    "id": 64,
                    "first_name": "Brit",
                    "last_name": "Wyness",
                    "email": "bwyness1r@pen.io",
                    "gender": "Female",
                    "ip_address": "51.203.131.245"
                    }, {
                    "id": 65,
                    "first_name": "Hortense",
                    "last_name": "Canario",
                    "email": "hcanario1s@npr.org",
                    "gender": "Female",
                    "ip_address": "6.82.39.155"
                    }, {
                    "id": 66,
                    "first_name": "Baily",
                    "last_name": "Jeves",
                    "email": "bjeves1t@google.co.jp",
                    "gender": "Male",
                    "ip_address": "100.73.31.148"
                    }, {
                    "id": 67,
                    "first_name": "Luciana",
                    "last_name": "Hubeaux",
                    "email": "lhubeaux1u@soup.io",
                    "gender": "Female",
                    "ip_address": "129.196.184.21"
                    }, {
                    "id": 68,
                    "first_name": "Gregory",
                    "last_name": "Youson",
                    "email": "gyouson1v@domainmarket.com",
                    "gender": "Male",
                    "ip_address": "240.86.123.34"
                    }, {
                    "id": 69,
                    "first_name": "Deni",
                    "last_name": "Vynoll",
                    "email": "dvynoll1w@mediafire.com",
                    "gender": "Female",
                    "ip_address": "192.65.252.86"
                    }, {
                    "id": 70,
                    "first_name": "Emlynn",
                    "last_name": "Morant",
                    "email": "emorant1x@soundcloud.com",
                    "gender": "Female",
                    "ip_address": "74.106.18.142"
                    }, {
                    "id": 71,
                    "first_name": "Codi",
                    "last_name": "Sharrock",
                    "email": "csharrock1y@tuttocitta.it",
                    "gender": "Male",
                    "ip_address": "41.228.118.211"
                    }, {
                    "id": 72,
                    "first_name": "Burlie",
                    "last_name": "Stell",
                    "email": "bstell1z@joomla.org",
                    "gender": "Male",
                    "ip_address": "174.185.213.65"
                    }, {
                    "id": 73,
                    "first_name": "Shirlene",
                    "last_name": "Sanper",
                    "email": "ssanper20@oaic.gov.au",
                    "gender": "Female",
                    "ip_address": "142.173.43.27"
                    }, {
                    "id": 74,
                    "first_name": "Paulie",
                    "last_name": "Kopke",
                    "email": "pkopke21@loc.gov",
                    "gender": "Female",
                    "ip_address": "229.241.114.217"
                    }, {
                    "id": 75,
                    "first_name": "Madelina",
                    "last_name": "Merricks",
                    "email": "mmerricks22@chron.com",
                    "gender": "Female",
                    "ip_address": "35.138.138.215"
                    }, {
                    "id": 76,
                    "first_name": "Filia",
                    "last_name": "Avrahamov",
                    "email": "favrahamov23@ifeng.com",
                    "gender": "Female",
                    "ip_address": "242.20.170.247"
                    }, {
                    "id": 77,
                    "first_name": "Jerald",
                    "last_name": "Shurrock",
                    "email": "jshurrock24@phoca.cz",
                    "gender": "Male",
                    "ip_address": "117.232.244.217"
                    }, {
                    "id": 78,
                    "first_name": "Marlon",
                    "last_name": "Symcoxe",
                    "email": "msymcoxe25@xing.com",
                    "gender": "Male",
                    "ip_address": "1.210.89.101"
                    }, {
                    "id": 79,
                    "first_name": "Kingsley",
                    "last_name": "Sulman",
                    "email": "ksulman26@upenn.edu",
                    "gender": "Male",
                    "ip_address": "58.50.166.85"
                    }, {
                    "id": 80,
                    "first_name": "Catie",
                    "last_name": "Flello",
                    "email": "cflello27@sbwire.com",
                    "gender": "Female",
                    "ip_address": "115.75.244.61"
                    }, {
                    "id": 81,
                    "first_name": "Elsbeth",
                    "last_name": "Coomber",
                    "email": "ecoomber28@census.gov",
                    "gender": "Female",
                    "ip_address": "104.207.40.37"
                    }, {
                    "id": 82,
                    "first_name": "Marcelo",
                    "last_name": "Millin",
                    "email": "mmillin29@miibeian.gov.cn",
                    "gender": "Male",
                    "ip_address": "179.3.159.231"
                    }, {
                    "id": 83,
                    "first_name": "Charley",
                    "last_name": "Lunbech",
                    "email": "clunbech2a@gnu.org",
                    "gender": "Male",
                    "ip_address": "29.238.22.206"
                    }, {
                    "id": 84,
                    "first_name": "Rosamund",
                    "last_name": "Litton",
                    "email": "rlitton2b@vimeo.com",
                    "gender": "Female",
                    "ip_address": "146.14.254.60"
                    }, {
                    "id": 85,
                    "first_name": "Addy",
                    "last_name": "Lawrey",
                    "email": "alawrey2c@amazonaws.com",
                    "gender": "Female",
                    "ip_address": "128.184.210.202"
                    }, {
                    "id": 86,
                    "first_name": "Bianca",
                    "last_name": "Anster",
                    "email": "banster2d@soup.io",
                    "gender": "Female",
                    "ip_address": "236.80.223.136"
                    }, {
                    "id": 87,
                    "first_name": "Mureil",
                    "last_name": "Affuso",
                    "email": "maffuso2e@angelfire.com",
                    "gender": "Female",
                    "ip_address": "102.41.13.195"
                    }, {
                    "id": 88,
                    "first_name": "Itch",
                    "last_name": "O'Day",
                    "email": "ioday2f@archive.org",
                    "gender": "Male",
                    "ip_address": "239.68.108.175"
                    }, {
                    "id": 89,
                    "first_name": "Artus",
                    "last_name": "Yushachkov",
                    "email": "ayushachkov2g@mapy.cz",
                    "gender": "Genderfluid",
                    "ip_address": "184.119.62.136"
                    }, {
                    "id": 90,
                    "first_name": "Florida",
                    "last_name": "Beri",
                    "email": "fberi2h@nhs.uk",
                    "gender": "Female",
                    "ip_address": "108.156.171.231"
                    }, {
                    "id": 91,
                    "first_name": "Shea",
                    "last_name": "Croux",
                    "email": "scroux2i@lycos.com",
                    "gender": "Male",
                    "ip_address": "81.115.220.147"
                    }, {
                    "id": 92,
                    "first_name": "Cassaundra",
                    "last_name": "Popplewell",
                    "email": "cpopplewell2j@smugmug.com",
                    "gender": "Non-binary",
                    "ip_address": "252.119.216.211"
                    }, {
                    "id": 93,
                    "first_name": "Gwenneth",
                    "last_name": "Corser",
                    "email": "gcorser2k@cloudflare.com",
                    "gender": "Bigender",
                    "ip_address": "33.48.218.52"
                    }, {
                    "id": 94,
                    "first_name": "Shanie",
                    "last_name": "Frango",
                    "email": "sfrango2l@sogou.com",
                    "gender": "Female",
                    "ip_address": "55.138.139.246"
                    }, {
                    "id": 95,
                    "first_name": "Idalia",
                    "last_name": "Alcido",
                    "email": "ialcido2m@imdb.com",
                    "gender": "Female",
                    "ip_address": "221.174.23.133"
                    }, {
                    "id": 96,
                    "first_name": "Merrielle",
                    "last_name": "Josifovitz",
                    "email": "mjosifovitz2n@dion.ne.jp",
                    "gender": "Female",
                    "ip_address": "37.222.228.23"
                    }, {
                    "id": 97,
                    "first_name": "Jarvis",
                    "last_name": "Arkle",
                    "email": "jarkle2o@gov.uk",
                    "gender": "Male",
                    "ip_address": "105.12.146.145"
                    }, {
                    "id": 98,
                    "first_name": "Olivia",
                    "last_name": "Griffiths",
                    "email": "ogriffiths2p@businesswire.com",
                    "gender": "Female",
                    "ip_address": "85.17.121.232"
                    }, {
                    "id": 99,
                    "first_name": "Rozele",
                    "last_name": "Pendrill",
                    "email": "rpendrill2q@google.co.uk",
                    "gender": "Female",
                    "ip_address": "66.238.145.32"
                    }, {
                    "id": 100,
                    "first_name": "Brig",
                    "last_name": "Lambdin",
                    "email": "blambdin2r@zdnet.com",
                    "gender": "Male",
                    "ip_address": "71.127.131.160"
                    }
                ],
                allExperiences: [],
                container: [],
                record: null,
                page_index: 1,
                page_size: 4
                
            }
        },
        components: {
            Header,
            Footer,
            LogoSearch,
            ItemExperience,
            Pagination,
        },
        computed: {
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.allExperiences.slice(start, end);
            }
        },
        mounted() {
            this.getData()
            // console.log(this.allExperiences.length)
            

        },
        methods: {
            async getData(){
                await Api.general.getAllExperiments().then((res)=>{
                    if(res.data.status){
                        // console.log("getAllExperience",res)
                        this.allExperiences = res.data.body
                        this.record = this.allExperiences.length
                    }
                })
                this.getAboutUs()
            },
            async getAboutUs(){
                this.container = this.array_chunk( this.allExperiences , this.page_size);
            },
            array_chunk(array, size){
                const chunked_arr = [];
                let index = - size;
                while (index < array.length) {
                    chunked_arr.push(array.slice(index, size + index));
                    index += size;
                }
                return chunked_arr;
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
            
        },
    }
</script>

<style  scoped>
.active {
  border-bottom: solid 3px #25A26B
}
</style>