import scrapy

class MainScpider(scrapy.Spider):
  name = 'main-spider'
  start_urls = ['http://quotes.toscrape.com/']

  def parse(self, response):
    self.log('Eu estou aqui {}'.format(response.url))
    texts = response.xpath('//span[@class="text"]/text()').extract()
    for text in texts:
      yield {
        'text': text
      }