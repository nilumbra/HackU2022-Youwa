require 'pathname'
$LOAD_PATH.unshift(Pathname.new(__dir__).join("vendor/bundle/ruby/3.0.0/gems/parslet-1.8.2/lib").to_s)
$LOAD_PATH.unshift('/usr/share/rubygems-integration/all/gems/bundler-2.3.5/lib/gems/bundler-2.3.5/lib')
# puts($LOAD_PATH)
require 'bundler/setup'
require 'parslet'
require 'json'

class ContractParser < Parslet::Parser

  # 正規表現の文字クラス用に準備
  # 数字
  NUM_STR = '0-9'.freeze
  ZENKAKU_NUM_STR = '０-９'.freeze
  KANJI_NUM_STR = '一二三四五六七八九十壱弐参拾百千万萬億兆〇'.freeze
  ALL_NUMBER_STR = NUM_STR + ZENKAKU_NUM_STR + KANJI_NUM_STR

  WHITE_SPACE_STR = '\t 　\ufeff'.freeze # \ufeffはBOM
  #
  # = カッコ
  # カッコの英語名：https://ginpen.com/2014/02/20/brackets/
  # 丸かっこ
  PARENTHESES_BEGIN_STR = '(（'.freeze
  PARENTHESES_END_STR = ')）'.freeze
  # 角括弧
  BRACKETS_BEGIN_STR = '\[［'.freeze
  BRACKETS_END_STR = '\]］'.freeze
  # 波括弧
  BRACES_BEGIN_STR = '{｛'.freeze
  BRACES_END_STR = '}｝'.freeze
  # 山カッコ
  ANGLE_BRACKETS_BEGIN_STR = '<＜〈《'.freeze
  ANGLE_BRACKETS_END_STR = '>＞〉》'.freeze
  # カギカッコ
  ANGLES_BEGIN_STR = '「『'.freeze
  ANGLES_END_STR = '」』'.freeze
  # その他のカッコ
  OTHER_BRACKETS_BEGIN_STR = '【〔〘〚'.freeze
  OTHER_BRACKETS_END_STR = '】〕〙〛'.freeze
  # 全カッコ
  ALL_BRACKETS_BEGIN_STR = PARENTHESES_BEGIN_STR + BRACKETS_BEGIN_STR + BRACES_BEGIN_STR + ANGLE_BRACKETS_BEGIN_STR + ANGLES_BEGIN_STR + OTHER_BRACKETS_BEGIN_STR
  ALL_BRACKETS_END_STR = PARENTHESES_END_STR + BRACKETS_END_STR + BRACES_END_STR + ANGLE_BRACKETS_END_STR + ANGLES_END_STR + OTHER_BRACKETS_END_STR

  PLACEHOLDERS_STR = '⚫○_'

  # 改行を含まない空白
  rule(:space) { match[WHITE_SPACE_STR] }
  rule(:spaces) { space.repeat(1) }
  rule(:spaces?) { spaces.maybe }

  # 改行を含む空白
  rule(:white_space) { space | new_line }
  rule(:white_spaces) { white_space.repeat(1) }
  rule(:white_spaces?) { white_spaces.maybe }

  # 改行
  rule(:new_line) { match["\n"] }

  # 空行
  rule(:empty_line) { spaces? >> new_line }
  rule(:empty_lines) { empty_line.repeat(1) }
  rule(:empty_lines?) { empty_lines.maybe }

  # 括弧
  rule(:open_bracket) { match[ALL_BRACKETS_BEGIN_STR] }
  rule(:close_bracket) { match[ALL_BRACKETS_END_STR] }
  rule(:open_parentheses) { match[PARENTHESES_BEGIN_STR] }
  rule(:close_parentheses) { match[PARENTHESES_END_STR] }

  # プレースホルダー
  rule(:placeholder) { match[PLACEHOLDERS_STR] }
  rule(:placeholders) { placeholder.repeat(1) }
  
  # 数字
  # TODO:（1.1などを含む場合があるため、ドットも含んだほうが良いかもしれない）
  rule(:number) { match[ALL_NUMBER_STR] }
  rule(:numbers) { number.repeat(1) }
  rule(:numbers?) { numbers.maybe }
  rule(:numbers_or_placeholders) { placeholders | numbers }

  # タイトル
  rule(:end_of_title) { empty_lines }
  rule(:title) { empty_lines? >> spaces? >> (end_of_title.absent? >> any).repeat(1).as('title') >> empty_lines }
  
  # 前文
  rule(:end_of_premises) { new_line >> (chapter_top | article_top) }
  rule(:premises) { empty_lines? >> ( end_of_premises.absent? >> any).repeat.as('premises') >> new_line }

  # 章TOP
  rule(:chapter_num) { (str('第') >> numbers_or_placeholders.as('chapter_num') >> str('章')) }
  rule(:chapter_header) { spaces? >> (new_line.absent? >> any).repeat(1).as('chapter_header') >> new_line }
  rule(:chapter_top) { empty_lines? >> spaces? >> chapter_num >> chapter_header }

  # 章
  rule(:chapter_body) { articles }
  rule(:chapter) { chapter_top >> chapter_body }
  rule(:chapters) { chapter.repeat(1).as("chapters") }

  # 条TOP
  rule(:article_num) { (str('第') >> numbers_or_placeholders.as('article_num') >> str('条')) }
  rule(:article_header) { open_bracket >> (close_bracket.absent? >> any).repeat(1).as('article_header') >> close_bracket }
  rule(:article_top) {
    article_num >> spaces? >> article_header |
    article_header >> white_spaces? >> article_num
  }

  # 条
  rule(:article_body) { clauses.as("article_body") }
  rule(:article) { empty_lines? >> (article_top >> white_spaces? >> article_body).as('article') }
  rule(:last_article) { empty_lines? >> (article_top >> white_spaces? >> last_clause).as('article') }
  rule(:last_article?) { last_article.maybe }
  rule(:articles) { (article.repeat >> last_article?).as('articles') }
  
  # 項
  rule(:clause_top) { spaces? >> numbers_or_placeholders.as("clause_num") >> match[".．"].maybe }
  rule(:end_of_clause) { empty_lines >> (chapter_top | article_top | clause_top | item_top) }
  rule(:clause_text) { (end_of_clause.absent? >> any).repeat(1).as("clause_text") }
  rule(:clause_body) { clause_text >> empty_lines >> items? }
  rule(:first_clause) { clause_top.maybe >> spaces? >> clause_body.as("clause_body") }
  rule(:clause) { clause_top >> spaces? >> clause_body.as("clause") }
  rule(:clauses) { first_clause >> clause.repeat }
  rule(:last_clause) { empty_lines? >> spaces? >> (empty_lines.absent? >> any).repeat(1).as("clause") >> empty_lines }

  # 号
  rule(:item_top) { spaces? >> open_parentheses >> numbers_or_placeholders.as("item_num") >> close_parentheses }
  rule(:end_of_item) { empty_lines >> (chapter_top | article_top | clause_top | item_top) }
  rule(:item_body) { (end_of_item.absent? >> any).repeat(1).as("item") >> empty_lines }
  rule(:item) { item_top >> spaces? >> item_body }
  rule(:items) { item.repeat(1) }
  rule(:items?) { items.maybe }

  # 後文
  rule(:end_of_closing) { empty_lines >> sign_date }
  rule(:closing) { empty_lines? >> spaces? >> (end_of_closing.absent? >> any).repeat.as('closing') >> empty_lines }
  rule(:closing?) { closing.maybe }

  # 日付
  rule(:year) { str('年') }
  rule(:month) { str('月') }
  rule(:day) { str('日') }
  rule(:year_in_date) { ((year | new_line).absent? >> any).repeat >> year }
  rule(:month_in_date) { ((month | new_line).absent? >> any).repeat >> month }
  rule(:day_in_date) { ((day | new_line).absent? >> any).repeat >> day }
  rule(:date) { year_in_date.as('year') >> month_in_date.as('month') >> day_in_date.as('day') }
  rule(:sign_date) { empty_lines? >> spaces? >> date.as('sign_date') >> ((spaces? >> new_line).absent? >> any).repeat >> spaces? >> new_line }

  # 署名欄
  rule(:signature) { empty_lines? >> spaces? >> any.repeat.as('signature') }

  # rule(:eof) { any.absent? }

  # 契約書全体
  rule(:contract) { title >> premises >> (articles | chapters) >> closing? >> sign_date >> signature }

  root(:contract)
end

DATA_PATH = './data/contract.txt'.freeze
# data = File.open(DATA_PATH, &:read)
data = $stdin.read

begin
  cp = ContractParser.new
  # puts "Ruby version: #{RUBY_VERSION}"
  pp cp.parse(data).to_json
  #pp cp.parse data
rescue Parslet::ParseFailed => error
  puts error.parse_failure_cause.ascii_tree
end

# グラフを描画する場合にはコメントイン
# require 'parslet/graphviz'
# ContractParser.graph(pdf: 'graph.pdf')
