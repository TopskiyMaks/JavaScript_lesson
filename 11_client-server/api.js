(function () {
  const APIToken = 'b375441681a4bb25fe98640456503b5f88e98626f82f1b3f48d4caa6db0ce9d1'

  function createListArticles(container) {
    const pageParams = new URLSearchParams(window.location.search);
    let page = pageParams.get('page');
    let list_articles = container.querySelector('.list-group')
    createArticleItem(container, page, list_articles)
    container.append(list_articles)

  }

  function createArticleItem(container, page, list_articles) {
    let block
    getItems(page).then(function (data) {
      let counter = document.createElement('p')
      counter.className = 'font-weight-light'
      counter.innerHTML = `Страница ${data.meta.pagination.page} из ${data.meta.pagination.pages} (Статей ${data.meta.pagination.total})`
      list_articles.append(counter)
      for (let article of data.data) {
        block = createBlock(article)
        list_articles.append(block)
      }
      let nav = createNav(data.meta.pagination)
      container.append(nav)
    });
    return
  }

  function createNav(data) {
    let nav = document.createElement('ul')
    nav.className = 'pagination justify-content-center'
    // Current
    let nav_items = {
      'prev': data.page - 1,
      'curr': data.page,
      'next': data.page + 1,
    }
    let nav_item
    for (let key in nav_items) {
      value = nav_items[key]
      nav_item = document.createElement('li')
      nav_item.className = 'page-item'
      nav_link = document.createElement('a')
      nav_link.className = 'page-link'
      if (nav_items['prev'] == 0) {
        value += 1
      }
      if (value == 1) {
        nav_link.setAttribute('href', `index.html`)
      } else {
        nav_link.setAttribute('href', `?page=${value}`)
      }
      if (value == data.page) {
        nav_item.className += ' active'
      }
      nav_link.innerHTML = value
      nav_item.append(nav_link)
      nav.append(nav_item)
    }
    return nav
  }

  async function getItems(page) {
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const data = await response.json();
    return data
  }

  async function getArticle(id) {
    const response = await fetch(`https://gorest.co.in/public-api/posts?id=${id}`);
    const data = await response.json();
    return data
  }

  async function getComments(id) {
    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    const data = await response.json();
    return data
  }

  function createBlock(article) {
    let article_id = article.id
    let block = document.createElement('a')
    block.className = 'list-group-item list-group-item-action'
    let body_block = document.createElement('div')
    body_block.className = 'd-flex w-100 justify-content-between'
    let title = document.createElement('h5')
    title.className = 'mb-1'
    title.innerHTML = article.title
    block.setAttribute('href', `article.html?id=${article_id}`)
    body_block.append(title)
    block.append(body_block)
    return block
  }

  function cleanTheDate(dateStr) {
    return new Date(dateStr).toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '')
  }

  function LoadArticle(container) {
    const pageParams = new URLSearchParams(window.location.search);
    let article_id = pageParams.get('id')
    createNavArticle(container, article_id)
    getArticle(article_id).then(function (data) {
      layoutList(container, data)
      getComments(article_id).then(function (data) {
        layoutComments(container, data)
      });
    });

  }

  function layoutList(container, data) {
    let title = document.createElement('h2')
    let body = document.createElement('p')
    let created = document.createElement('p')
    title.className = 'display-5 text-center mb-3'
    title.innerHTML = data.data[0].title
    body.innerHTML = data.data[0].body
    body.className = 'text-justify text-monospace'
    created.innerHTML = `Создано ${cleanTheDate(data.data[0].created_at)}`
    created.className = 'text-sm-right text-muted'
    container.append(title)
    container.append(body)
    container.append(created)
  }

  function layoutComments(container, data) {
    let block_coments = document.createElement('div')
    let header = document.createElement('h4')
    let author_block = document.createElement('div')
    let author = document.createElement('h6')
    let text_comment = document.createElement('p')
    block_coments.className = 'list-group'
    author_block.className = 'd-flex w-100 justify-content-between'
    author.className = 'mb-1'
    header.innerHTML = 'Комментарии'
    header.className = 'mb-3'
    author.innerHTML = data.data[0].name
    text_comment.innerHTML = data.data[0].body
    text_comment.className = 'mb-1'
    author_block.append(author)
    block_coments.append(header)
    block_coments.append(author_block)
    block_coments.append(text_comment)
    container.append(block_coments)
  }

  function createNavArticle(container, article_id) {
    let nav_link = document.createElement('a')
    nav_link.className = 'nav justify-content-left text-primary nav-link'
    nav_link.innerHTML = 'Назад'
    nav_link.onclick = function () {
      history.back();
    }
    container.append(nav_link)
  }

  window.LoadArticle = LoadArticle;
  window.createListArticles = createListArticles;
})();
