const californiaCompanies = [
  ["Apple", "Consumer hardware, services, AI", "Cupertino", "Consumer / Platform"],
  ["Alphabet / Google", "Search, ads, cloud, AI", "Mountain View", "AI / Cloud"],
  ["Nvidia", "AI chips, accelerated computing", "Santa Clara", "AI / Semiconductor"],
  ["Meta", "Social, ads, AI, VR", "Menlo Park", "Consumer / AI"],
  ["Amazon", "Marketplace, AWS, ads, devices, AI", "Santa Monica / Culver City / Bay Area", "Marketplace / Cloud"],
  ["Broadcom", "Semiconductors, infrastructure software", "Palo Alto", "Semiconductor"],
  ["Oracle", "Cloud, databases, enterprise software", "Redwood City / Austin", "Enterprise"],
  ["Cisco", "Networking, security, collaboration", "San Jose", "Enterprise"],
  ["Salesforce", "CRM, AI, enterprise SaaS", "San Francisco", "Enterprise"],
  ["Netflix", "Streaming, ads, games", "Los Gatos", "Consumer"],
  ["Adobe", "Creative, document, marketing software", "San Jose", "Enterprise / Creative"],
  ["ServiceNow", "Workflow automation, AI agents", "Santa Clara", "Enterprise"],
  ["Intuit", "Fintech, SMB, tax products", "Mountain View", "Fintech"],
  ["AMD", "CPUs, GPUs, AI compute", "Santa Clara", "Semiconductor"],
  ["Qualcomm", "Mobile, automotive, edge AI chips", "San Diego", "Semiconductor"],
  ["Applied Materials", "Semiconductor equipment", "Santa Clara", "Semiconductor"],
  ["Lam Research", "Semiconductor equipment", "Fremont", "Semiconductor"],
  ["KLA", "Semiconductor process control", "Milpitas", "Semiconductor"],
  ["Palo Alto Networks", "Cybersecurity platform", "Santa Clara", "Security"],
  ["Snowflake", "Data cloud, AI apps", "Bozeman / San Mateo", "Data / Cloud"],
  ["Uber", "Mobility, delivery, marketplace", "San Francisco", "Marketplace"],
  ["Airbnb", "Travel marketplace", "San Francisco", "Marketplace"],
  ["DoorDash", "Local commerce, logistics", "San Francisco", "Marketplace"],
  ["Block", "Payments, commerce, Cash App", "Oakland", "Fintech"],
  ["PayPal", "Payments, wallets, merchant tools", "San Jose", "Fintech"],
  ["Coinbase", "Crypto exchange and infrastructure", "Remote / San Francisco", "Fintech"],
  ["Robinhood", "Consumer investing", "Menlo Park", "Fintech"],
  ["Affirm", "Consumer credit and checkout", "San Francisco", "Fintech"],
  ["SoFi", "Consumer finance", "San Francisco", "Fintech"],
  ["Chime", "Consumer banking", "San Francisco", "Fintech"],
  ["Visa", "Payments network", "San Francisco", "Fintech"],
  ["Workday", "HR and finance SaaS", "Pleasanton", "Enterprise"],
  ["Atlassian", "Collaboration and developer tools", "San Francisco", "Enterprise / DevTools"],
  ["Databricks", "Lakehouse, data, AI", "San Francisco", "Data / AI"],
  ["Confluent", "Streaming data infrastructure", "Mountain View", "Data / Cloud"],
  ["Elastic", "Search, observability, security", "Mountain View", "Data / Cloud"],
  ["HashiCorp", "Infrastructure automation", "San Francisco", "Cloud / DevTools"],
  ["GitLab", "DevSecOps platform", "Remote / San Francisco", "DevTools"],
  ["Figma", "Design collaboration", "San Francisco", "Design / Collaboration"],
  ["Notion", "Workspace and AI productivity", "San Francisco", "Productivity"],
  ["Asana", "Work management", "San Francisco", "Productivity"],
  ["Dropbox", "File collaboration", "San Francisco", "Productivity"],
  ["Box", "Content cloud", "Redwood City", "Enterprise"],
  ["Slack", "Collaboration platform", "San Francisco", "Enterprise / Collaboration"],
  ["Zoom", "Communications platform", "San Jose", "Enterprise / Collaboration"],
  ["Twilio", "Communications APIs", "San Francisco", "DevTools"],
  ["Okta", "Identity and access", "San Francisco", "Security"],
  ["Cloudflare", "Network, edge, security", "San Francisco", "Security / Cloud"],
  ["Zscaler", "Cloud security", "San Jose", "Security"],
  ["Fortinet", "Network security", "Sunnyvale", "Security"],
  ["CrowdStrike", "Endpoint and cloud security", "Sunnyvale", "Security"],
  ["SentinelOne", "AI security", "Mountain View", "Security"],
  ["Rubrik", "Cyber resilience", "Palo Alto", "Security / Data"],
  ["Palantir", "Data platforms", "Palo Alto", "Data / AI"],
  ["Scale AI", "AI data and evaluation", "San Francisco", "AI"],
  ["OpenAI", "AI models and products", "San Francisco", "AI"],
  ["Anthropic", "AI models and products", "San Francisco", "AI"],
  ["Perplexity", "AI search and answers", "San Francisco", "AI / Consumer"],
  ["Glean", "Enterprise AI search", "Palo Alto", "AI / Enterprise"],
  ["Character.AI", "Consumer AI", "Menlo Park", "AI / Consumer"],
  ["Cohere", "Enterprise AI", "San Francisco", "AI / Enterprise"],
  ["Sierra", "AI customer agents", "San Francisco", "AI / Enterprise"],
  ["Harvey", "Legal AI", "San Francisco", "AI / Vertical SaaS"],
  ["Abridge", "Clinical AI", "San Francisco", "Health / AI"],
  ["Tempus", "Precision medicine AI", "Redwood City", "Health / AI"],
  ["Samsara", "Connected operations", "San Francisco", "IoT / Enterprise"],
  ["Rippling", "HR, IT, finance workforce platform", "San Francisco", "Enterprise"],
  ["Brex", "Spend management", "San Francisco", "Fintech"],
  ["Plaid", "Financial data APIs", "San Francisco", "Fintech / DevTools"],
  ["Stripe", "Payments infrastructure", "San Francisco", "Fintech / DevTools"],
  ["Square", "Seller tools and payments", "Oakland", "Fintech / SMB"],
  ["Instacart", "Grocery marketplace", "San Francisco", "Marketplace"],
  ["Lyft", "Mobility marketplace", "San Francisco", "Marketplace"],
  ["Pinterest", "Discovery and ads", "San Francisco", "Consumer"],
  ["Reddit", "Communities and ads", "San Francisco", "Consumer"],
  ["Snap", "Camera, social, AR", "Santa Monica", "Consumer"],
  ["Roku", "TV platform and ads", "San Jose", "Consumer / Ads"],
  ["Electronic Arts", "Games and live services", "Redwood City", "Gaming"],
  ["Roblox", "UGC gaming platform", "San Mateo", "Gaming"],
  ["Riot Games", "Games and esports", "Los Angeles", "Gaming"],
  ["PlayStation", "Gaming platform", "San Mateo", "Gaming"],
  ["Activision Blizzard", "Games", "Santa Monica / Irvine", "Gaming"],
  ["Tesla", "EVs, energy, autonomy", "Palo Alto / Fremont", "Mobility / AI"],
  ["Rivian", "EVs and software", "Irvine", "Mobility"],
  ["Lucid Motors", "EVs", "Newark", "Mobility"],
  ["Waymo", "Autonomous driving", "Mountain View", "Mobility / AI"],
  ["Zoox", "Autonomous mobility", "Foster City", "Mobility / AI"],
  ["Cruise", "Autonomous driving", "San Francisco", "Mobility / AI"],
  ["Anduril", "Defense technology", "Costa Mesa", "Defense / AI"],
  ["SpaceX", "Space and connectivity", "Hawthorne", "Aerospace"],
  ["Rocket Lab", "Space systems", "Long Beach", "Aerospace"],
  ["Planet", "Satellite imagery", "San Francisco", "Aerospace / Data"],
  ["Viasat", "Satellite communications", "Carlsbad", "Aerospace / Network"],
  ["Amgen", "Biotech", "Thousand Oaks", "Health / Biotech"],
  ["Gilead Sciences", "Biopharma", "Foster City", "Health / Biotech"],
  ["Genentech", "Biotech", "South San Francisco", "Health / Biotech"],
  ["Illumina", "Genomics", "San Diego", "Health / Biotech"],
  ["Dexcom", "Diabetes devices and software", "San Diego", "Health"],
  ["Intuitive Surgical", "Robotic surgery", "Sunnyvale", "Health / Robotics"],
  ["Guardant Health", "Cancer diagnostics", "Palo Alto", "Health / Data"],
];

const careerHomeUrls = {
  Apple: "https://jobs.apple.com/en-us/search",
  "Alphabet / Google": "https://www.google.com/about/careers/applications/jobs/results/",
  Nvidia: "https://jobs.nvidia.com/careers",
  Meta: "https://www.metacareers.com/jobs/",
  Amazon: "https://www.amazon.jobs/en/",
  Broadcom: "https://www.broadcom.com/company/careers",
  Oracle: "https://careers.oracle.com/jobs/",
  Cisco: "https://jobs.cisco.com/jobs/SearchJobs/",
  Salesforce: "https://careers.salesforce.com/en/jobs/",
  Netflix: "https://explore.jobs.netflix.net/careers",
  Adobe: "https://careers.adobe.com/us/en/search-results",
  ServiceNow: "https://careers.servicenow.com/jobs/",
  Intuit: "https://jobs.intuit.com/search-jobs/",
  AMD: "https://careers.amd.com/careers-home/jobs",
  Qualcomm: "https://careers.qualcomm.com/careers",
  "Applied Materials": "https://amat.wd1.myworkdayjobs.com/External",
  "Lam Research": "https://careers.lamresearch.com/search",
  KLA: "https://kla.wd1.myworkdayjobs.com/Search",
  "Palo Alto Networks": "https://jobs.paloaltonetworks.com/en/jobs/",
  Snowflake: "https://careers.snowflake.com/us/en/search-results",
  Uber: "https://www.uber.com/us/en/careers/list/",
  Airbnb: "https://careers.airbnb.com/positions/",
  DoorDash: "https://careers.doordash.com/jobs/",
  Block: "https://block.xyz/careers/jobs",
  PayPal: "https://paypal.eightfold.ai/careers",
  Coinbase: "https://www.coinbase.com/careers/positions",
  Robinhood: "https://careers.robinhood.com/openings/",
  Affirm: "https://www.affirm.com/careers",
  SoFi: "https://www.sofi.com/careers/",
  Chime: "https://www.chime.com/careers/",
  Visa: "https://jobs.smartrecruiters.com/Visa",
  Workday: "https://workday.wd5.myworkdayjobs.com/Workday",
  Atlassian: "https://www.atlassian.com/company/careers/all-jobs",
  Databricks: "https://www.databricks.com/company/careers/open-positions",
  Confluent: "https://www.confluent.io/careers/",
  Elastic: "https://jobs.elastic.co/jobs",
  HashiCorp: "https://www.hashicorp.com/careers/open-positions",
  GitLab: "https://about.gitlab.com/jobs/all-jobs/",
  Figma: "https://www.figma.com/careers/",
  Notion: "https://www.notion.com/careers",
  Asana: "https://asana.com/jobs/all",
  Dropbox: "https://jobs.dropbox.com/all-jobs",
  Box: "https://www.box.com/careers/openings",
  Slack: "https://slack.com/careers",
  Zoom: "https://careers.zoom.us/jobs/search",
  Twilio: "https://www.twilio.com/en-us/company/jobs",
  Okta: "https://www.okta.com/company/careers/",
  Cloudflare: "https://www.cloudflare.com/careers/jobs/",
  Zscaler: "https://www.zscaler.com/careers/search-jobs",
  Fortinet: "https://www.fortinet.com/corporate/careers/search-jobs",
  CrowdStrike: "https://www.crowdstrike.com/en-us/careers/jobs/",
  SentinelOne: "https://www.sentinelone.com/careers/",
  Rubrik: "https://www.rubrik.com/company/careers",
  Palantir: "https://www.palantir.com/careers/",
  "Scale AI": "https://www.scale.com/careers",
  OpenAI: "https://openai.com/careers/search/",
  Anthropic: "https://www.anthropic.com/jobs",
  Perplexity: "https://www.perplexity.ai/careers",
  Glean: "https://www.glean.com/careers",
  "Character.AI": "https://character.ai/careers",
  Cohere: "https://cohere.com/careers",
  Sierra: "https://sierra.ai/careers",
  Harvey: "https://www.harvey.ai/careers",
  Abridge: "https://www.abridge.com/careers",
  Tempus: "https://www.tempus.com/careers/",
  Samsara: "https://www.samsara.com/company/careers/roles",
  Rippling: "https://www.rippling.com/careers/open-roles",
  Brex: "https://www.brex.com/careers",
  Plaid: "https://plaid.com/careers/openings/",
  Stripe: "https://stripe.com/jobs/search",
  Square: "https://block.xyz/careers/jobs",
  Instacart: "https://instacart.careers/current-openings/",
  Lyft: "https://www.lyft.com/careers",
  Pinterest: "https://www.pinterestcareers.com/jobs/",
  Reddit: "https://www.redditinc.com/careers",
  Snap: "https://careers.snap.com/jobs",
  Roku: "https://www.weareroku.com/jobs",
  "Electronic Arts": "https://www.ea.com/careers/careers-overview/worldwide-studios",
  Roblox: "https://careers.roblox.com/jobs",
  "Riot Games": "https://www.riotgames.com/en/work-with-us/jobs",
  PlayStation: "https://www.playstation.com/en-us/corporate/playstation-careers/",
  "Activision Blizzard": "https://careers.activisionblizzard.com/search-results",
  Tesla: "https://www.tesla.com/careers/search/",
  Rivian: "https://careers.rivian.com/careers-home/jobs",
  "Lucid Motors": "https://lucidmotors.com/careers/search",
  Waymo: "https://waymo.com/joinus/",
  Zoox: "https://zoox.com/careers/",
  Cruise: "https://getcruise.com/careers/",
  Anduril: "https://www.anduril.com/careers/",
  SpaceX: "https://www.spacex.com/careers/jobs/",
  "Rocket Lab": "https://www.rocketlabusa.com/careers/positions/",
  Planet: "https://www.planet.com/company/careers/",
  Viasat: "https://careers.viasat.com/careers/SearchJobs",
  Amgen: "https://careers.amgen.com/en/search-results",
  "Gilead Sciences": "https://gilead.wd1.myworkdayjobs.com/gileadcareers",
  Genentech: "https://careers.gene.com/us/en/search-results",
  Illumina: "https://illumina.wd1.myworkdayjobs.com/illumina-careers",
  Dexcom: "https://careers.dexcom.com/careers-home/jobs",
  "Intuitive Surgical": "https://careers.intuitive.com/en/jobs/",
  "Guardant Health": "https://guardanthealth.com/jobs/",
};

const positionUrls = {
  Apple: "https://jobs.apple.com/en-us/search?search=product%20manager&location=california-state953",
  "Alphabet / Google": "https://www.google.com/about/careers/applications/jobs/results/?q=Product%20Manager&location=California",
  Nvidia: "https://jobs.nvidia.com/careers?query=product%20manager&location=California",
  Meta: "https://www.metacareers.com/jobs/?q=Product%20Manager&offices%5B0%5D=Menlo%20Park%2C%20CA&offices%5B1%5D=San%20Francisco%2C%20CA",
  Amazon: "https://www.amazon.jobs/en/search?base_query=Product%20Manager&loc_query=California%2C%20United%20States",
  Oracle: "https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions?keyword=Product%20Manager&location=California",
  Cisco: "https://jobs.cisco.com/jobs/SearchJobs/Product%20Manager?21178=%5B169482%5D&21178_format=6020",
  Salesforce: "https://careers.salesforce.com/en/jobs/?search=Product%20Manager&country=United%20States%20of%20America&state=California",
  Adobe: "https://careers.adobe.com/us/en/search-results?keywords=Product%20Manager&location=California",
  ServiceNow: "https://careers.servicenow.com/jobs/?q=Product%20Manager&location=California",
  Intuit: "https://jobs.intuit.com/search-jobs/Product%20Manager/27595/1",
  Qualcomm: "https://careers.qualcomm.com/careers?query=Product%20Manager&location=California",
  Snowflake: "https://careers.snowflake.com/us/en/search-results?keywords=Product%20Manager",
  Uber: "https://www.uber.com/us/en/careers/list/?query=Product%20Manager&location=USA-California",
  Airbnb: "https://careers.airbnb.com/positions/?_departments=product",
  DoorDash: "https://careers.doordash.com/jobs/?search=Product%20Manager",
  PayPal: "https://paypal.eightfold.ai/careers?query=product%20manager",
  Coinbase: "https://www.coinbase.com/careers/positions?department=Product",
  Robinhood: "https://careers.robinhood.com/openings/?q=Product",
  Visa: "https://jobs.smartrecruiters.com/Visa?search=Product%20Manager",
  Atlassian: "https://www.atlassian.com/company/careers/all-jobs?search=Product%20Manager",
  Databricks: "https://www.databricks.com/company/careers/open-positions?department=Product",
  GitLab: "https://about.gitlab.com/jobs/all-jobs/?search=Product%20Manager",
  Figma: "https://www.figma.com/careers/?search=product",
  Notion: "https://www.notion.com/careers?department=Product",
  Asana: "https://asana.com/jobs/all?department=Product",
  Dropbox: "https://jobs.dropbox.com/all-jobs?keyword=product",
  Box: "https://www.box.com/careers/openings?query=product",
  Zoom: "https://careers.zoom.us/jobs/search?query=Product%20Manager",
  Twilio: "https://www.twilio.com/en-us/company/jobs?search=Product%20Manager",
  Cloudflare: "https://www.cloudflare.com/careers/jobs/?query=Product%20Manager",
  CrowdStrike: "https://www.crowdstrike.com/en-us/careers/jobs/?q=Product%20Manager",
  Palantir: "https://www.palantir.com/careers/?search=Product",
  OpenAI: "https://openai.com/careers/search/?q=Product%20Manager",
  Anthropic: "https://www.anthropic.com/jobs?search=product",
  Samsara: "https://www.samsara.com/company/careers/roles?query=Product%20Manager",
  Rippling: "https://www.rippling.com/careers/open-roles?query=Product",
  Plaid: "https://plaid.com/careers/openings/?query=Product",
  Stripe: "https://stripe.com/jobs/search?query=Product%20Manager",
  Pinterest: "https://www.pinterestcareers.com/jobs/?search=Product%20Manager",
  Snap: "https://careers.snap.com/jobs?search=Product",
  Roblox: "https://careers.roblox.com/jobs?search=Product",
  Tesla: "https://www.tesla.com/careers/search/?query=Product%20Manager",
  Rivian: "https://careers.rivian.com/careers-home/jobs?keywords=Product%20Manager",
  SpaceX: "https://www.spacex.com/careers/jobs/?search=Product",
  Amgen: "https://careers.amgen.com/en/search-results?keywords=Product%20Manager",
  Dexcom: "https://careers.dexcom.com/careers-home/jobs?keywords=Product",
};

const newsroomUrls = {
  Apple: "https://www.apple.com/newsroom/",
  "Alphabet / Google": "https://blog.google/",
  Nvidia: "https://nvidianews.nvidia.com/",
  Meta: "https://about.fb.com/news/",
  Amazon: "https://www.aboutamazon.com/news",
  Broadcom: "https://investors.broadcom.com/news-releases",
  Oracle: "https://www.oracle.com/news/",
  Cisco: "https://newsroom.cisco.com/",
  Salesforce: "https://www.salesforce.com/news/",
  Netflix: "https://about.netflix.com/en/newsroom",
  Adobe: "https://news.adobe.com/",
  ServiceNow: "https://www.servicenow.com/company/media/press-room.html",
  Intuit: "https://www.intuit.com/blog/",
  AMD: "https://www.amd.com/en/newsroom.html",
  Qualcomm: "https://www.qualcomm.com/news/releases",
  "Applied Materials": "https://www.appliedmaterials.com/company/news",
  "Lam Research": "https://newsroom.lamresearch.com/",
  KLA: "https://www.kla.com/about/newsroom",
  "Palo Alto Networks": "https://www.paloaltonetworks.com/company/press",
  Snowflake: "https://www.snowflake.com/news/",
  Uber: "https://www.uber.com/newsroom/",
  Airbnb: "https://news.airbnb.com/",
  DoorDash: "https://about.doordash.com/en-us/news",
  Block: "https://block.xyz/news",
  PayPal: "https://newsroom.paypal-corp.com/",
  Coinbase: "https://www.coinbase.com/blog",
  Robinhood: "https://newsroom.aboutrobinhood.com/",
  Affirm: "https://investors.affirm.com/news-releases",
  SoFi: "https://www.sofi.com/press/",
  Chime: "https://www.chime.com/newsroom/",
  Visa: "https://usa.visa.com/about-visa/newsroom.html",
  Workday: "https://newsroom.workday.com/",
  Atlassian: "https://www.atlassian.com/blog",
  Databricks: "https://www.databricks.com/company/newsroom",
  Confluent: "https://www.confluent.io/blog/",
  Elastic: "https://www.elastic.co/blog/",
  HashiCorp: "https://www.hashicorp.com/blog",
  GitLab: "https://about.gitlab.com/press/",
  Figma: "https://www.figma.com/blog/",
  Notion: "https://www.notion.com/blog",
  Asana: "https://asana.com/press",
  Dropbox: "https://blog.dropbox.com/",
  Box: "https://blog.box.com/",
  Slack: "https://slack.com/blog/news",
  Zoom: "https://news.zoom.us/",
  Twilio: "https://www.twilio.com/en-us/blog",
  Okta: "https://www.okta.com/newsroom/",
  Cloudflare: "https://blog.cloudflare.com/",
  Zscaler: "https://www.zscaler.com/company/press",
  Fortinet: "https://www.fortinet.com/corporate/about-us/newsroom/press-releases",
  CrowdStrike: "https://www.crowdstrike.com/en-us/blog/",
  SentinelOne: "https://www.sentinelone.com/blog/",
  Rubrik: "https://www.rubrik.com/blog",
  Palantir: "https://www.palantir.com/newsroom/",
  "Scale AI": "https://scale.com/blog",
  OpenAI: "https://openai.com/news/",
  Anthropic: "https://www.anthropic.com/news",
  Perplexity: "https://www.perplexity.ai/hub/blog",
  Glean: "https://www.glean.com/blog",
  "Character.AI": "https://blog.character.ai/",
  Cohere: "https://cohere.com/blog",
  Sierra: "https://sierra.ai/blog",
  Harvey: "https://www.harvey.ai/blog",
  Abridge: "https://www.abridge.com/blog",
  Tempus: "https://www.tempus.com/news/",
  Samsara: "https://www.samsara.com/blog",
  Rippling: "https://www.rippling.com/blog",
  Brex: "https://www.brex.com/journal",
  Plaid: "https://plaid.com/blog/",
  Stripe: "https://stripe.com/newsroom",
  Square: "https://squareup.com/us/en/press",
  Instacart: "https://www.instacart.com/company/pressreleases/",
  Lyft: "https://www.lyft.com/blog",
  Pinterest: "https://newsroom.pinterest.com/",
  Reddit: "https://www.redditinc.com/blog",
  Snap: "https://newsroom.snap.com/",
  Roku: "https://newsroom.roku.com/",
  "Electronic Arts": "https://www.ea.com/news",
  Roblox: "https://corp.roblox.com/newsroom/",
  "Riot Games": "https://www.riotgames.com/en/news",
  PlayStation: "https://blog.playstation.com/",
  "Activision Blizzard": "https://newsroom.activisionblizzard.com/",
  Tesla: "https://www.tesla.com/blog",
  Rivian: "https://rivian.com/newsroom",
  "Lucid Motors": "https://lucidmotors.com/stories",
  Waymo: "https://waymo.com/blog/",
  Zoox: "https://zoox.com/journal/",
  Cruise: "https://getcruise.com/news/",
  Anduril: "https://www.anduril.com/newsroom/",
  SpaceX: "https://www.spacex.com/updates/",
  "Rocket Lab": "https://www.rocketlabusa.com/updates/",
  Planet: "https://www.planet.com/pulse/",
  Viasat: "https://news.viasat.com/",
  Amgen: "https://www.amgen.com/newsroom",
  "Gilead Sciences": "https://www.gilead.com/news-and-press",
  Genentech: "https://www.gene.com/media",
  Illumina: "https://www.illumina.com/company/news-center.html",
  Dexcom: "https://www.dexcom.com/news",
  "Intuitive Surgical": "https://www.intuitive.com/en-us/about-us/newsroom",
  "Guardant Health": "https://guardanthealth.com/newsroom/",
};

const hiringProcessUrls = {
  Apple: "https://www.apple.com/careers/us/work-at-apple.html",
  "Alphabet / Google": "https://www.google.com/about/careers/applications/how-we-hire/",
  Nvidia: "https://www.nvidia.com/en-us/about-nvidia/careers/",
  Meta: "https://www.metacareers.com/careerprograms/pathways/",
  Amazon: "https://www.amazon.jobs/content/en/how-we-hire",
  Oracle: "https://www.oracle.com/careers/culture-and-inclusion/",
  Cisco: "https://jobs.cisco.com/jobs/content/Our-Hiring-Process/",
  Salesforce: "https://careers.salesforce.com/en/how-we-hire/",
  Netflix: "https://jobs.netflix.com/culture",
  Adobe: "https://careers.adobe.com/us/en/hiring-process",
  ServiceNow: "https://careers.servicenow.com/life-at-servicenow/",
  Intuit: "https://jobs.intuit.com/life-at-intuit/",
  Qualcomm: "https://careers.qualcomm.com/careers",
  "Palo Alto Networks": "https://jobs.paloaltonetworks.com/en/life-at-palo-alto-networks/",
  Uber: "https://www.uber.com/us/en/careers/interviewing/",
  Airbnb: "https://careers.airbnb.com/how-we-hire/",
  DoorDash: "https://careers.doordash.com/candidate-privacy-notice/",
  Coinbase: "https://www.coinbase.com/careers/interviewing-at-coinbase",
  Robinhood: "https://careers.robinhood.com/",
  Visa: "https://usa.visa.com/careers.html",
  Atlassian: "https://www.atlassian.com/company/careers/resources",
  GitLab: "https://handbook.gitlab.com/handbook/hiring/interviewing/",
  Figma: "https://www.figma.com/careers/",
  Dropbox: "https://jobs.dropbox.com/life-at-dropbox",
  Box: "https://www.box.com/careers",
  Slack: "https://slack.com/careers",
  Zoom: "https://careers.zoom.us/life-at-zoom",
  Twilio: "https://www.twilio.com/en-us/company/jobs/recruiting-faq",
  Okta: "https://www.okta.com/company/careers/",
  Cloudflare: "https://www.cloudflare.com/careers/life-at-cloudflare/",
  OpenAI: "https://openai.com/careers/",
  Anthropic: "https://www.anthropic.com/careers",
  Stripe: "https://stripe.com/jobs",
  Tesla: "https://www.tesla.com/careers",
  SpaceX: "https://www.spacex.com/careers/",
  Amgen: "https://careers.amgen.com/en/how-we-hire",
};

const glassdoorCompanyAliases = {
  "Alphabet / Google": "google",
  Nvidia: "nvidia",
  Meta: "meta",
  "Applied Materials": "applied-materials",
  "Lam Research": "lam-research",
  "Palo Alto Networks": "palo-alto-networks",
  "Scale AI": "scale-ai",
  "Character.AI": "character-ai",
  "Lucid Motors": "lucid-motors",
  "Rocket Lab": "rocket-lab",
  "Gilead Sciences": "gilead-sciences",
  "Intuitive Surgical": "intuitive-surgical",
  "Guardant Health": "guardant-health",
};

const onePointThreeAcresPmUrls = {
  Apple: "https://www.1point3acres.com/bbs/thread-555279-1-1.html",
  "Alphabet / Google": "https://www.1point3acres.com/bbs/thread-1134631-1-1.html",
  Meta: "https://www.1point3acres.com/bbs/thread-573697-1-1.html",
  Amazon: "https://www.1point3acres.com/bbs/thread-742362-1-1.html",
  Uber: "https://www.1point3acres.com/bbs/thread-809263-1-1.html",
  Airbnb: "https://www.1point3acres.com/bbs/thread-357332-1-1.html",
  Coinbase: "https://www.1point3acres.com/bbs/thread-1128554-1-1.html",
  Robinhood: "https://www.1point3acres.com/bbs/thread-1121797-1-1.html",
  OpenAI: "https://www.1point3acres.com/bbs/thread-1109681-1-1.html",
  Stripe: "https://www.1point3acres.com/bbs/thread-645436-1-1.html",
  "Lucid Motors": "https://www.1point3acres.com/bbs/thread-708646-1-1.html",
};

const companyPmGuideUrls = {
  Apple: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/apple-pm-interview" }],
  "Alphabet / Google": [
    { key: "officialPmGuide", href: "https://d3no4ktch0fdq4.cloudfront.net/public/course/files/PM_Prep_Guide_2.pdf" },
    { key: "pmGuide", href: "https://www.tryexponent.com/guides/google-product-manager-interview" },
  ],
  Nvidia: [
    { key: "pmGuide", href: "https://igotanoffer.com/en/advice/nvidia-product-manager-interview" },
    { key: "aiPmGuide", href: "https://www.tryexponent.com/guides/nvidia-ai-product-manager-interview" },
  ],
  Meta: [
    { key: "officialPmGuide", href: "https://d3no4ktch0fdq4.cloudfront.net/public/course/files/Meta_PM_interview_guide.pdf" },
    { key: "pmGuide", href: "https://www.tryexponent.com/guides/meta-product-manager-interview" },
  ],
  Amazon: [
    { key: "officialPmGuide", href: "https://www.amazon.jobs/content/en/how-we-hire/product-manager-interview-prep" },
    { key: "officialPmtGuide", href: "https://www.amazon.jobs/content/en/how-we-hire/pm-t-interview-prep" },
  ],
  Salesforce: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/salesforce-product-manager-interview-guide" }],
  Netflix: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/netflix-product-manager-interview" }],
  Adobe: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/adobe-product-manager-interview" }],
  Intuit: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/intuit-product-manager-interview" }],
  Uber: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/uber-product-manager-interview-guide" }],
  Airbnb: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/airbnb-product-manager-interview" }],
  DoorDash: [
    {
      key: "officialPmGuide",
      href: "https://assets.website-files.com/62f57607512f156e6e9ae03f/6491bc4ad0bc77d89f649d3c_Product%20Management%20-%20Onsite%20Prep%20Guide.pdf",
    },
    { key: "pmGuide", href: "https://www.tryexponent.com/guides/doordash-product-manager-interview" },
  ],
  Coinbase: [{ key: "pmGuide", href: "https://igotanoffer.com/blogs/product-manager/coinbase-product-manager-interview" }],
  Robinhood: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/robinhood-product-manager-interview" }],
  SoFi: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/sofi-product-manager-interview" }],
  Atlassian: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/atlassian-product-manager-interview" }],
  Dropbox: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/dropbox-product-manager-interview" }],
  Twilio: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/twilio-product-manager-interview" }],
  Workday: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/workday-product-manager-interview" }],
  OpenAI: [
    { key: "officialInterviewGuide", href: "https://openai.com/interview-guide/" },
    { key: "pmGuide", href: "https://igotanoffer.com/en/advice/openai-product-manager-interview" },
    { key: "growthPmGuide", href: "https://www.tryexponent.com/guides/openai-growth-product-manager-pm-interview-guide" },
  ],
  Perplexity: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/perplexity-ai-product-manager-interview" }],
  Sierra: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/sierra-agent-product-manager-pm-interview-guide" }],
  Stripe: [
    { key: "officialPmProfile", href: "https://stripe.com/jobs/product-manager-jd.pdf" },
    { key: "pmGuide", href: "https://www.tryexponent.com/guides/stripe-product-manager-interview" },
  ],
  Square: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/square-product-manager-interview" }],
  Instacart: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/instacart-product-manager-interview" }],
  Lyft: [{ key: "pmGuide", href: "https://igotanoffer.com/blogs/product-manager/lyft-product-manager-interview" }],
  Pinterest: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/pinterest-product-manager-interview-guide" }],
  Snap: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/snap-product-manager-interview" }],
  Roblox: [{ key: "apmGuide", href: "https://www.tryexponent.com/guides/roblox-associate-product-manager-apm-interview-guide" }],
  SpaceX: [{ key: "pmGuide", href: "https://www.tryexponent.com/guides/spacex-product-manager-pm-interview" }],
};

const UI_STORE_KEY = "pm-intel-portal-language";

const translations = {
  en: {
    eyebrow: "California top-100 focus",
    title: "PM Intel Portal",
    subtitle: "One place to collect PM role leads, prep guidance, and interview question sources.",
    languageLabel: "Language",
    controlsTitle: "Target Filter",
    controlsBody: "Pick a company segment, then open the direct official pages for the matching companies.",
    searchLabel: "Search companies",
    searchPlaceholder: "Apple, AI, fintech, San Francisco",
    segmentLabel: "Segment",
    allSegments: "All segments",
    companySetLabel: "Company set",
    top100: "Top 100",
    top30: "Top 30",
    roleLabel: "PM angle",
    positionsTitle: "PM Positions",
    companyCount: "{shown} of {scope} in selected set",
    pmRoles: "Official PM roles",
    careers: "Career site",
    companyNews: "Newsroom / blog",
    interviewInfo: "Hiring process",
    officialPmGuide: "Official PM guide",
    officialPmtGuide: "Official PM-T guide",
    officialInterviewGuide: "Official interview guide",
    officialPmProfile: "Official PM profile",
    pmGuide: "PM prep guide",
    aiPmGuide: "AI PM guide",
    growthPmGuide: "Growth PM guide",
    apmGuide: "APM guide",
    glassdoorQuestions: "Glassdoor questions",
    onePointThreeAcres: "1P3A PM exp",
    prepTitle: "How To Prepare",
    prepBody: "Use these when a role looks real.",
    questionsTitle: "Questions & Exams",
    questionsBody: "Product sense, execution, metrics, strategy, and behavioral drills.",
    openSource: "Open source",
    emptyCompanies: "No companies match this filter.",
  },
  zh: {
    eyebrow: "加州前 100 公司聚焦",
    title: "PM 信息情报门户",
    subtitle: "集中收集产品经理职位线索、准备资料和面试题来源。",
    languageLabel: "语言",
    controlsTitle: "目标筛选",
    controlsBody: "选择公司类型，然后打开匹配公司的官方直达页面。",
    searchLabel: "搜索公司",
    searchPlaceholder: "Apple、AI、金融科技、旧金山",
    segmentLabel: "领域",
    allSegments: "全部领域",
    companySetLabel: "公司范围",
    top100: "前 100",
    top30: "前 30",
    roleLabel: "PM 方向",
    positionsTitle: "PM 职位信息",
    companyCount: "当前范围显示 {shown} / {scope} 家公司",
    pmRoles: "官方 PM 职位页",
    careers: "公司招聘站",
    companyNews: "官方新闻 / 博客",
    interviewInfo: "招聘流程",
    officialPmGuide: "官方 PM 指南",
    officialPmtGuide: "官方 PM-T 指南",
    officialInterviewGuide: "官方面试指南",
    officialPmProfile: "官方 PM 职位画像",
    pmGuide: "PM 准备指南",
    aiPmGuide: "AI PM 指南",
    growthPmGuide: "增长 PM 指南",
    apmGuide: "APM 指南",
    glassdoorQuestions: "Glassdoor 题目",
    onePointThreeAcres: "一亩三分地 PM 面经",
    prepTitle: "如何准备",
    prepBody: "当某个职位看起来值得投入时，先看这些准备资料。",
    questionsTitle: "题库与面试题",
    questionsBody: "产品感、执行、指标、战略和行为面试练习。",
    openSource: "打开来源",
    emptyCompanies: "没有公司符合当前筛选条件。",
  },
};

const roleLabels = {
  en: {
    "Product Manager": "Product Manager",
    "Senior Product Manager": "Senior Product Manager",
    "AI Product Manager": "AI Product Manager",
    "Growth Product Manager": "Growth Product Manager",
    "Platform Product Manager": "Platform Product Manager",
    "Technical Product Manager": "Technical Product Manager",
    "Associate Product Manager": "Associate Product Manager",
  },
  zh: {
    "Product Manager": "产品经理",
    "Senior Product Manager": "高级产品经理",
    "AI Product Manager": "AI 产品经理",
    "Growth Product Manager": "增长产品经理",
    "Platform Product Manager": "平台产品经理",
    "Technical Product Manager": "技术产品经理",
    "Associate Product Manager": "助理产品经理",
  },
};

const segmentLabelsZh = {
  AI: "人工智能",
  "AI / Cloud": "人工智能 / 云",
  "AI / Consumer": "人工智能 / 消费产品",
  "AI / Enterprise": "人工智能 / 企业服务",
  "AI / Semiconductor": "人工智能 / 半导体",
  "AI / Vertical SaaS": "人工智能 / 垂直 SaaS",
  Aerospace: "航天",
  "Aerospace / Data": "航天 / 数据",
  "Aerospace / Network": "航天 / 网络",
  "Cloud / DevTools": "云 / 开发者工具",
  Consumer: "消费产品",
  "Consumer / AI": "消费产品 / 人工智能",
  "Consumer / Ads": "消费产品 / 广告",
  "Consumer / Platform": "消费产品 / 平台",
  "Data / AI": "数据 / 人工智能",
  "Data / Cloud": "数据 / 云",
  "Defense / AI": "国防科技 / 人工智能",
  "Design / Collaboration": "设计 / 协作",
  DevTools: "开发者工具",
  Enterprise: "企业服务",
  "Enterprise / Collaboration": "企业服务 / 协作",
  "Enterprise / Creative": "企业服务 / 创意工具",
  "Enterprise / DevTools": "企业服务 / 开发者工具",
  Fintech: "金融科技",
  "Fintech / DevTools": "金融科技 / 开发者工具",
  "Fintech / SMB": "金融科技 / 中小企业",
  Gaming: "游戏",
  Health: "医疗健康",
  "Health / AI": "医疗健康 / 人工智能",
  "Health / Biotech": "医疗健康 / 生物科技",
  "Health / Consumer": "医疗健康 / 消费产品",
  "Health / Data": "医疗健康 / 数据",
  "Health / Robotics": "医疗健康 / 机器人",
  "IoT / Enterprise": "物联网 / 企业服务",
  Marketplace: "交易平台",
  "Marketplace / Cloud": "交易平台 / 云",
  Mobility: "出行",
  "Mobility / AI": "出行 / 人工智能",
  Productivity: "效率工具",
  Security: "安全",
  "Security / Cloud": "安全 / 云",
  "Security / Data": "安全 / 数据",
  Semiconductor: "半导体",
};

const prepResources = [
  {
    title: "IGotAnOffer PM Prep",
    source: "Popular structured PM prep guide",
    note: "A broad FAANG+ preparation path for process, question types, staged practice, and company-specific loops.",
    tags: ["Plan", "FAANG+", "Question types"],
    zh: {
      source: "热门结构化 PM 准备指南",
      note: "覆盖 FAANG+ 准备路径、面试流程、题型、分阶段练习和公司差异。",
      tags: ["计划", "大厂", "题型"],
    },
    url: "https://igotanoffer.com/blogs/product-manager/pm-interview-prep",
  },
  {
    title: "Lenny Rachitsky: Preparing for a PM Interview",
    source: "Trusted PM operator and newsletter author",
    note: "Useful high-level prep flow: research the company and product, practice live, then study patterns and frameworks.",
    tags: ["Trusted person", "Research", "Practice"],
    zh: {
      source: "知名 PM 作者与实战操作者",
      note: "清晰的准备顺序：研究公司和产品、真人模拟练习，再补框架和题型。",
      tags: ["知名作者", "调研", "练习"],
    },
    url: "https://www.lennysnewsletter.com/p/preparing-for-a-pm-interview",
  },
  {
    title: "Cracking the PM Interview",
    source: "Classic PM interview book by Gayle Laakmann McDowell and Jackie Bavaro",
    note: "A durable reference for PM resumes, product design questions, behavioral preparation, and role targeting.",
    tags: ["Book", "Classic", "Career switch"],
    zh: {
      source: "Gayle Laakmann McDowell 与 Jackie Bavaro 的经典 PM 面试书",
      note: "适合系统理解 PM 简历、产品设计题、行为面试和目标岗位选择。",
      tags: ["书", "经典", "转岗"],
    },
    url: "https://www.crackingthepminterview.com/",
  },
  {
    title: "Exponent PM Interview Tips",
    source: "Popular PM interview prep platform",
    note: "Practical advice for sourcing opportunities, recruiter screens, hiring manager calls, onsite loops, and offer-stage execution.",
    tags: ["Interview flow", "Mock practice", "Execution"],
    zh: {
      source: "热门 PM 面试准备平台",
      note: "覆盖找机会、HR 筛选、hiring manager、onsite 和 offer 阶段的实操建议。",
      tags: ["面试流程", "模拟练习", "执行"],
    },
    url: "https://www.tryexponent.com/blog/product-manager-interview-tips",
  },
  {
    title: "PMExercises",
    source: "Practice bank and mock partner tool",
    note: "Good for repeatable practice: a large PM question bank, answer examples, and peer mock interview matching.",
    tags: ["Practice bank", "Mock partners", "Answers"],
    zh: {
      source: "题库与模拟面试伙伴工具",
      note: "适合持续练习：大型 PM 题库、答案参考，以及同伴模拟面试匹配。",
      tags: ["题库", "模拟伙伴", "答案参考"],
    },
    url: "https://www.productmanagementexercises.com/",
  },
  {
    title: "RocketBlocks Product Management",
    source: "Drill platform",
    note: "Practice drills for product sense, strategy, analytical skills, and technical fluency.",
    tags: ["Drills", "Analytics", "Strategy"],
    zh: {
      source: "练习平台",
      note: "用于训练产品感、战略、分析能力和技术理解力。",
      tags: ["练习", "分析", "战略"],
    },
    url: "https://www.rocketblocks.me/product-management.php",
  },
  {
    title: "Lewis Lin PM Resources",
    source: "Curated frameworks from a well-known PM interview author",
    note: "Compact frameworks, checklists, and company-specific prep links from the author of Decode and Conquer.",
    tags: ["Frameworks", "Checklist", "Author"],
    zh: {
      source: "知名 PM 面试作者整理的框架",
      note: "Decode and Conquer 作者整理的框架、清单和公司准备链接。",
      tags: ["框架", "清单", "作者"],
    },
    url: "https://www.lewis-lin.com/resources/",
  },
  {
    title: "Interview Pilot PM Guide",
    source: "General PM interview overview",
    note: "A quick taxonomy of product sense, execution, metrics, analytics, strategy, technical, and behavioral rounds.",
    tags: ["Overview", "Study map", "Round types"],
    zh: {
      source: "通用 PM 面试概览",
      note: "快速拆解产品感、执行、指标、分析、战略、技术和行为面试。",
      tags: ["总览", "准备地图", "轮次类型"],
    },
    url: "https://www.interviewpilot.app/interview-guides/product-manager",
  },
  {
    title: "Stripe PM Organization Guide",
    source: "Top fintech/product-ops company essay",
    note: "Field-specific reference for how strong product organizations evaluate PM judgment, product insight, prioritization, and cross-functional conflict.",
    tags: ["Fintech", "PM craft", "Hiring lens"],
    zh: {
      source: "顶级金融科技公司的产品组织文章",
      note: "用于理解优秀产品组织如何看 PM 判断、产品洞察、优先级和跨团队冲突。",
      tags: ["金融科技", "PM 能力", "招聘视角"],
    },
    url: "https://stripe.com/guides/atlas/building-a-great-pm-org",
  },
];

const questionResources = [
  {
    title: "LeetProduct PM Questions",
    source: "Question bank",
    note: "Large collection of PM interview questions by company, round type, and difficulty.",
    zh: {
      source: "题库",
      note: "按公司、轮次类型和难度整理的大量 PM 面试题。",
    },
    url: "https://www.leetproduct.com/",
  },
  {
    title: "MockIF PM Questions",
    source: "Question and prep guide",
    note: "Company patterns and drill categories for product sense, metrics, strategy, and behavioral.",
    zh: {
      source: "题目与准备指南",
      note: "覆盖公司模式，以及产品感、指标、战略和行为面试训练分类。",
    },
    url: "https://mockif.com/roles/product-manager",
  },
  {
    title: "Best PM Jobs Interview Prep",
    source: "Question collections",
    note: "Topical question sets for roadmap, strategy, senior PM, engineering-manager interviews, and company guides.",
    zh: {
      source: "题目集合",
      note: "包含路线图、战略、高级 PM、工程经理面试和公司指南等主题题集。",
    },
    url: "https://www.bestpmjobs.com/resources/interview-prep",
  },
  {
    title: "Interview Pilot Questions",
    source: "Sample questions",
    note: "Fast reference for common product sense, execution, metrics, analytics, strategy, and behavioral prompts.",
    zh: {
      source: "样例题",
      note: "快速查看常见产品感、执行、指标、分析、战略和行为面试问题。",
    },
    url: "https://www.interviewpilot.app/interview-guides/product-manager",
  },
  {
    title: "1Point3Acres PM面经",
    source: "Chinese PM interview-experience forum",
    note:
      "Dedicated PM interview board with company-specific PM-family posts, including Amazon PM, OpenAI PM, Apple PM/EPM, Google PM, Uber PM, Stripe PM, Coinbase PM, Robinhood PM, and Lucid PM experiences.",
    zh: {
      source: "中文 PM 面试经验版块",
      note:
        "一亩三分地海外面经下的 PM 面经专版；包含 Amazon PM、OpenAI PM、Apple PM/EPM、Google PM、Uber PM、Stripe PM、Coinbase PM、Robinhood PM、Lucid PM 等公司经验。",
    },
    url: "https://www.1point3acres.com/bbs/forum-335-1.html",
  },
  {
    title: "1Point3Acres 产品经理PM版",
    source: "Chinese PM discussion and prep board",
    note:
      "Broader PM forum for preparation threads and PM-specific discussion; indexed examples include Amazon PM leadership-principle interview prep and PM internship interview posts.",
    zh: {
      source: "中文产品经理讨论与准备版块",
      note:
        "产品经理 PM 专版，用于准备帖和 PM 求职讨论；索引示例包含 Amazon PM 领导力原则面试准备、微软产品经理实习面经等。",
    },
    url: "https://www.1point3acres.com/bbs/forum-336-1.html",
  },
];

const searchInput = document.getElementById("companySearch");
const segmentFilter = document.getElementById("segmentFilter");
const companySetFilter = document.getElementById("companySetFilter");
const roleFilter = document.getElementById("roleFilter");
const languageSelect = document.getElementById("languageSelect");
let currentLanguage = window.localStorage.getItem(UI_STORE_KEY) || "en";

function companyCareersUrl(company) {
  return careerHomeUrls[company];
}

function googleJobsUrl(company, role) {
  return positionUrls[company] || careerHomeUrls[company];
}

function interviewUrl(company) {
  return hiringProcessUrls[company] || careerHomeUrls[company];
}

function newsUrl(company) {
  return newsroomUrls[company] || careerHomeUrls[company];
}

function sharedQuestionsUrl(company) {
  const companySlug = glassdoorCompanyAliases[company] || company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const roleSlug = "product-manager";
  const roleLength = roleSlug.length;
  const companyStart = roleLength + 1;
  const companyEnd = companyStart + companySlug.length;
  return `https://www.glassdoor.com/Interview/${roleSlug}-${companySlug}-interview-questions-SRCH_KO0%2C${roleLength}_KE${companyStart}%2C${companyEnd}.htm`;
}

function onePointThreeAcresUrl(company) {
  return onePointThreeAcresPmUrls[company];
}

function companyPmGuideLinks(company) {
  return companyPmGuideUrls[company] || [];
}

function cardLinks(company, role) {
  const linkSpecs = [
    { key: "pmRoles", href: googleJobsUrl(company, role) },
    { key: "careers", href: companyCareersUrl(company) },
    { key: "companyNews", href: newsUrl(company) },
    { key: "interviewInfo", href: interviewUrl(company) },
    ...companyPmGuideLinks(company),
    { key: "glassdoorQuestions", href: sharedQuestionsUrl(company) },
    { key: "onePointThreeAcres", href: onePointThreeAcresUrl(company) },
  ].filter((link) => link.href);
  const merged = [];
  linkSpecs.forEach((link) => {
    const existing = merged.find((item) => item.href === link.href);
    if (existing) {
      existing.keys.push(link.key);
    } else {
      merged.push({ href: link.href, keys: [link.key] });
    }
  });
  return merged;
}

function linkLabel(keys) {
  return keys.map((key) => t(key)).join(currentLanguage === "zh" ? " / " : " + ");
}

function t(key, replacements = {}) {
  let value = translations[currentLanguage][key] || translations.en[key] || key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replace(`{${name}}`, replacement);
  });
  return value;
}

function segmentLabel(segment) {
  return currentLanguage === "zh" ? segmentLabelsZh[segment] || segment : segment;
}

function roleLabel(role) {
  return roleLabels[currentLanguage][role] || role;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = currentLanguage === "zh" ? "加州 PM 信息情报门户" : "California PM Intel Portal";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  searchInput.placeholder = t("searchPlaceholder");
  languageSelect.value = currentLanguage;
  renderRoleOptions();
  renderCompanySetOptions();
  renderSegments();
  renderResources("prepResources", prepResources);
  renderResources("questionResources", questionResources);
  renderCompanies();
}

function renderRoleOptions() {
  const selectedRole = roleFilter.value || "Product Manager";
  roleFilter.innerHTML = Object.keys(roleLabels.en)
    .map((role) => `<option value="${role}">${escapeHtml(roleLabel(role))}</option>`)
    .join("");
  roleFilter.value = selectedRole;
}

function renderCompanySetOptions() {
  const selectedSet = companySetFilter.value || "100";
  companySetFilter.innerHTML = `
    <option value="100">${escapeHtml(t("top100"))}</option>
    <option value="30">${escapeHtml(t("top30"))}</option>
  `;
  companySetFilter.value = selectedSet;
}

function renderSegments() {
  const segments = [...new Set(californiaCompanies.map((company) => company[3]))].sort();
  const selectedSegment = segmentFilter.value || "all";
  segmentFilter.innerHTML =
    `<option value="all">${escapeHtml(t("allSegments"))}</option>` +
    segments.map((segment) => `<option value="${escapeHtml(segment)}">${escapeHtml(segmentLabel(segment))}</option>`).join("");
  segmentFilter.value = selectedSegment;
}

function scopedCompanies() {
  const scope = Number(companySetFilter.value) || californiaCompanies.length;
  return californiaCompanies.slice(0, Math.min(scope, californiaCompanies.length));
}

function filteredCompanies() {
  const search = searchInput.value.trim().toLowerCase();
  const segment = segmentFilter.value;
  return scopedCompanies().filter(([name, focus, location, companySegment]) => {
    const haystack = `${name} ${focus} ${location} ${companySegment}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    const matchesSegment = segment === "all" || companySegment === segment;
    return matchesSearch && matchesSegment;
  });
}

function renderCompanies() {
  const role = roleFilter.value;
  const scopedCompanyList = scopedCompanies();
  const companies = filteredCompanies();
  document.getElementById("companyCount").textContent = t("companyCount", {
    shown: companies.length,
    scope: scopedCompanyList.length,
  });
  document.getElementById("companyList").innerHTML = companies.length
    ? companies
        .map(([name, focus, location, segment], index) => {
          const originalRank = californiaCompanies.findIndex((company) => company[0] === name) + 1;
          const links = cardLinks(name, role)
            .map(
              (link) =>
                `<a class="mini-link" href="${link.href}" target="_blank" rel="noreferrer">${escapeHtml(linkLabel(link.keys))}</a>`,
            )
            .join("");
          return `
            <article class="company-card">
              <div class="company-head">
                <div class="company-title">
                  <span class="rank">${originalRank}</span>
                  <div>
                    <strong>${escapeHtml(name)}</strong>
                    <div class="company-location">${escapeHtml(location)}</div>
                    <p>${escapeHtml(focus)}</p>
                  </div>
                </div>
              </div>
              <div class="pill-row">
                <span class="pill">${escapeHtml(segmentLabel(segment))}</span>
                <span class="pill">${escapeHtml(roleLabel(role))}</span>
              </div>
              <div class="link-row">${links}</div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty">${escapeHtml(t("emptyCompanies"))}</div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function renderResources(id, resources) {
  document.getElementById(id).innerHTML = resources
    .map(
      (resource) => {
        const localized = currentLanguage === "zh" ? resource.zh || {} : {};
        const tags = localized.tags || resource.tags || [];
        return `
        <article class="resource-card">
          <strong>${escapeHtml(resource.title)}</strong>
          <p>${escapeHtml(localized.source || resource.source)}</p>
          <p>${escapeHtml(localized.note || resource.note)}</p>
          ${
            tags.length
              ? `<div class="pill-row resource-tags">${tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}</div>`
              : ""
          }
          <a class="mini-link" href="${resource.url}" target="_blank" rel="noreferrer">${escapeHtml(t("openSource"))}</a>
        </article>
      `;
      },
    )
    .join("");
}

function bindEvents() {
  [searchInput, segmentFilter, companySetFilter, roleFilter].forEach((element) => {
    element.addEventListener("input", renderCompanies);
    element.addEventListener("change", renderCompanies);
  });
  languageSelect.addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    window.localStorage.setItem(UI_STORE_KEY, currentLanguage);
    applyLanguage();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  applyLanguage();
});
