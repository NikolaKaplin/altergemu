import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/db"
import { faqItems } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

async function FaqContent() {
  const faqs = await db.select().from(faqItems).where(eq(faqItems.isActive, true)).orderBy(asc(faqItems.order))

  const categories = [...new Set(faqs.map((faq) => faq.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о наших услугах и процессах работы
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter((faq) => faq.category === category)

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge variant="outline">{category}</Badge>
                    <span className="text-2xl">{category}</span>
                  </CardTitle>
                  <CardDescription>
                    {categoryFaqs.length} {categoryFaqs.length === 1 ? "вопрос" : "вопросов"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <div
                            className="prose prose-gray dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )
          })}

          {faqs.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">FAQ пока не добавлены</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Не нашли ответ на свой вопрос?</CardTitle>
              <CardDescription>Свяжитесь с нами, и мы обязательно поможем</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@altergemu.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Написать нам
                </a>
                <a
                  href="/support"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Центр поддержки
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FaqContent />
    </Suspense>
  )
}
