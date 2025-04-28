import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CSSSpritesDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">CSS Sprites 演示</h1>
      </div>

      <div className="mb-8 space-y-4">
        <p>
          CSS Sprites 是一种将多个小图标合并到一张大图中的技术，通过CSS的 <code>background-position</code>
          属性来显示所需的部分。这种技术可以减少HTTP请求数量，提高页面加载速度。
        </p>
        <p>下面是一个社交媒体图标的CSS Sprites演示：</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold mb-4">使用单独图标</h2>
          <p className="mb-4">每个图标都需要一个单独的HTTP请求</p>

          <div className="flex space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="icon-facebook"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="icon-twitter"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="icon-instagram"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="icon-linkedin"></span>
            </div>
          </div>

          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {`.icon-facebook {
  background-image: url('/icons/facebook.png');
  width: 24px;
  height: 24px;
  display: inline-block;
}

.icon-twitter {
  background-image: url('/icons/twitter.png');
  width: 24px;
  height: 24px;
  display: inline-block;
}

/* 更多单独图标... */`}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">使用CSS Sprites</h2>
          <p className="mb-4">所有图标只需一个HTTP请求</p>

          <div className="flex space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sprite sprite-facebook"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sprite sprite-twitter"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sprite sprite-instagram"></span>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="sprite sprite-linkedin"></span>
            </div>
          </div>

          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {`.sprite {
  background-image: url('/icons/sprite.png');
  width: 24px;
  height: 24px;
  display: inline-block;
}

.sprite-facebook {
  background-position: 0 0;
}

.sprite-twitter {
  background-position: -24px 0;
}

.sprite-instagram {
  background-position: -48px 0;
}

.sprite-linkedin {
  background-position: -72px 0;
}`}
          </pre>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">CSS Sprites 的优缺点</h2>

        <h3 className="font-bold mt-4 mb-2">优点：</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>减少HTTP请求数量，提高页面加载速度</li>
          <li>减少总下载量（合并图片通常比单独图片总和小）</li>
          <li>减少服务器负载</li>
          <li>预加载所有图标，避免悬停状态时的延迟</li>
        </ul>

        <h3 className="font-bold mt-4 mb-2">缺点：</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>维护复杂，添加或修改图标需要重新生成整个sprite</li>
          <li>如果只需要一两个图标，反而会增加下载量</li>
          <li>在响应式设计中可能不够灵活</li>
          <li>现代网站可能更倾向于使用SVG图标或图标字体</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">现代替代方案</h2>
        <p className="mb-4">虽然CSS Sprites仍然有用，但现代网站通常使用以下替代方案：</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>SVG图标（可缩放且文件小）</li>
          <li>图标字体（如Font Awesome）</li>
          <li>内联SVG（避免额外的HTTP请求）</li>
          <li>HTTP/2多路复用（减少了合并资源的必要性）</li>
        </ul>
        <p>
          在HTTP/2环境下，多个小请求的性能惩罚已大大减少，使得CSS Sprites的优势不如以前明显。 但在某些特定场景下，CSS
          Sprites仍然是一种有效的优化技术。
        </p>
      </div>
    </div>
  )
}
