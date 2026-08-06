/**
 * 共享导航生成器 — 所有课程页面的统一目录
 * 新增课程只改这个文件，所有页面自动同步
 */
(function () {
  // ── 课程配置（加新课只改这里） ──
  var COURSES = [
    {
      label: 'Claude Code 进阶',
      filePrefix: '',  // lessons/ 目录下的文件
      lessons: [
        { num: '01', title: 'Hooks 入门', file: '0001-hooks-basics.html' },
        { num: '02', title: 'Custom Skills', file: '0002-custom-skills.html' },
        { num: '03', title: '自定义 Subagent', file: '0003-custom-subagents.html' },
        { num: '04', title: 'Workflow 编排', file: '0004-workflows.html' },
        { num: '05', title: '高级模式', file: '0005-advanced-patterns.html' },
        { num: '06', title: '实战整合', file: '0006-project.html' },
      ],
    },
    {
      label: 'Stitch AI 设计',
      filePrefix: 'stitch/',
      lessons: [
        { num: '01', title: 'Stitch 基础', file: 'stitch/0001-stitch-basics.html' },
        { num: '02', title: '提示词工程', file: 'stitch/0002-stitch-prompt.html' },
        { num: '03', title: 'DESIGN.md', file: 'stitch/0003-stitch-designmd.html' },
        { num: '04', title: 'Stitch SDK', file: 'stitch/0004-stitch-sdk.html' },
        { num: '05', title: 'MCP + Claude Code', file: 'stitch/0005-stitch-mcp.html' },
        { num: '06', title: '实战 Design-to-Code', file: 'stitch/0006-stitch-project.html' },
      ],
    },
    {
      label: 'OmniRoute AI 网关',
      filePrefix: 'omniroute/',
      lessons: [
        { num: '01', title: 'OmniRoute 基础', file: 'omniroute/0001-omniroute-basics.html' },
        { num: '02', title: '路由策略', file: 'omniroute/0002-omniroute-routing.html' },
        { num: '03', title: 'Token 压缩', file: 'omniroute/0003-omniroute-compression.html' },
        { num: '04', title: 'MCP + 代理集成', file: 'omniroute/0004-omniroute-mcp.html' },
        { num: '05', title: 'CLI 与运维', file: 'omniroute/0005-omniroute-cli.html' },
        { num: '06', title: '实战 $0 开发环境', file: 'omniroute/0006-omniroute-project.html' },
      ],
    },
    {
      label: 'Matt Pocock Skills',
      filePrefix: 'mattpocock/',
      lessons: [
        { num: '01', title: '安装与配置', file: 'mattpocock/0001-matt-install.html' },
        { num: '02', title: '核心实操 Grill/TDD/Review', file: 'mattpocock/0002-matt-core.html' },
        { num: '03', title: '进阶 Handoff/Wayfinder', file: 'mattpocock/0003-matt-advanced.html' },
      ],
    },
    {
      label: 'yt-dlp 音视频下载',
      filePrefix: 'yt-dlp/',
      lessons: [
        { num: '01', title: 'yt-dlp 基础', file: 'yt-dlp/0001-ytdlp-basics.html' },
        { num: '02', title: 'yt-dlp 进阶', file: 'yt-dlp/0002-ytdlp-advanced.html' },
        { num: '03', title: 'yt-dlp 原理', file: 'yt-dlp/0003-ytdlp-internals.html' },
        { num: '04', title: '集成与自动化', file: 'yt-dlp/0004-ytdlp-automation.html' },
      ],
    },
    {
      label: 'Strix AI 渗透测试',
      filePrefix: 'strix/',
      lessons: [
        { num: '01', title: 'Strix 基础', file: 'strix/0001-strix-basics.html' },
        { num: '02', title: '高级扫描', file: 'strix/0002-strix-advanced.html' },
        { num: '03', title: '架构与原理', file: 'strix/0003-strix-architecture.html' },
      ],
    },
    {
      label: 'Transformers 模型库',
      filePrefix: 'transformers/',
      lessons: [
        { num: '01', title: 'Transformers 基础', file: 'transformers/0001-transformers-basics.html' },
        { num: '02', title: '7 个实战任务', file: 'transformers/0002-transformers-scenarios.html' },
        { num: '03', title: '原理 Tokenizer/AutoClass', file: 'transformers/0003-transformers-internals.html' },
        { num: '04', title: '指挥大模型的命令', file: 'transformers/0004-transformers-integration.html' },
      ],
    },
    {
      label: 'Open Design 设计工作台',
      filePrefix: 'open-design/',
      lessons: [
        { num: '01', title: 'Open Design 基础', file: 'open-design/0001-opendesign-basics.html' },
        { num: '02', title: '集成与指挥', file: 'open-design/0002-opendesign-integration.html' },
      ],
    },
    {
      label: 'Ponytail · 精简代码',
      filePrefix: '',
      lessons: [
        { num: '01', title: 'Ponytail 入门', file: '0007-ponytail-intro.html' },
        { num: '02', title: 'Ponytail 进阶', file: '0008-ponytail-advanced.html' },
      ],
    },
  ];

  // ── 判断当前页面信息 ──
  var path = window.location.pathname;
  var currentFile = path.split('/').pop();               // 如 0001-hooks-basics.html

  // 检测当前页面属于哪个子目录，决定标签和链接前缀
  var currentLabel = '课程目录';
  var p = '';
  for (var ci = 0; ci < COURSES.length; ci++) {
    var fp = COURSES[ci].filePrefix;
    if (fp && path.indexOf('/' + fp.replace('/', '')) !== -1) {
      currentLabel = COURSES[ci].label + ' · 课程目录';
      p = '../';
      break;
    }
  }
  // 没匹配到任何子目录（即 lessons/ 根目录），用第一个课程的标签
  if (!p) currentLabel = COURSES[0].label + ' · 课程目录';

  // ── 设置标签 ──
  var labelEl = document.querySelector('.course-nav__label');
  if (labelEl) labelEl.textContent = currentLabel;

  var asideEl = document.querySelector('.course-nav');
  if (asideEl) asideEl.setAttribute('aria-label', currentLabel);

  // ── 生成导航列表 ──
  var html = '';
  // 首页链接
  html += '<li style="margin-bottom:0.4rem;"><a href="' + p + '../index.html" style="font-weight:600;color:var(--accent)">🏠 首页</a></li>';
  for (var c = 0; c < COURSES.length; c++) {
    var course = COURSES[c];
    html += '<li style="margin-top:' + (c > 0 ? '0.5rem' : '0') +
      ';font-size:0.75rem;color:#888;font-weight:600;letter-spacing:0.06em;padding:0 0.45rem;">▸ ' +
      course.label + '</li>';
    for (var l = 0; l < course.lessons.length; l++) {
      var lesson = course.lessons[l];
      // 提取纯文件名对比（去掉 stitch/ 前缀）
      var fileName = lesson.file.split('/').pop();
      var active = currentFile === fileName ? ' aria-current="page"' : '';
      html += '<li><a href="' + p + lesson.file + '"' + active + '>' +
        lesson.num + ' · ' + lesson.title + '</a></li>';
    }
  }

  document.querySelector('.course-nav__list').innerHTML = html;

  // ── 自动滚动到当前课程 ──
  var activeLink = document.querySelector('.course-nav__list a[aria-current="page"]');
  if (activeLink) {
    activeLink.scrollIntoView({ block: 'center', behavior: 'auto' });
  }

  // ── 折叠/展开切换 ──
  var toggleBtn = document.querySelector('.course-nav__toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('nav-collapsed');
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      toggleBtn.setAttribute('aria-expanded', expanded);
    });
  }
})();
