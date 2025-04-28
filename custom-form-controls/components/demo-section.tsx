"use client"

import { useState } from "react"

export function DemoSection() {
  const [checkboxValues, setCheckboxValues] = useState({
    basic: false,
    blue: false,
    green: false,
    animated: false,
  })

  const [radioValue, setRadioValue] = useState("")

  const handleCheckboxChange = (name: keyof typeof checkboxValues) => {
    setCheckboxValues((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  return (
    <section className="mb-12 bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">交互演示</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-medium mb-4 text-gray-800">自定义复选框</h3>

          {/* 基础样式复选框 */}
          <div className="mb-6">
            <div className="custom-checkbox">
              <input
                type="checkbox"
                id="checkbox-basic"
                checked={checkboxValues.basic}
                onChange={() => handleCheckboxChange("basic")}
              />
              <label htmlFor="checkbox-basic">基础样式</label>
            </div>

            {/* 蓝色主题复选框 */}
            <div className="custom-checkbox custom-checkbox-blue">
              <input
                type="checkbox"
                id="checkbox-blue"
                checked={checkboxValues.blue}
                onChange={() => handleCheckboxChange("blue")}
              />
              <label htmlFor="checkbox-blue">蓝色主题</label>
            </div>

            {/* 绿色主题复选框 */}
            <div className="custom-checkbox custom-checkbox-green">
              <input
                type="checkbox"
                id="checkbox-green"
                checked={checkboxValues.green}
                onChange={() => handleCheckboxChange("green")}
              />
              <label htmlFor="checkbox-green">绿色主题</label>
            </div>

            {/* 动画效果复选框 */}
            <div className="custom-checkbox custom-checkbox-animated">
              <input
                type="checkbox"
                id="checkbox-animated"
                checked={checkboxValues.animated}
                onChange={() => handleCheckboxChange("animated")}
              />
              <label htmlFor="checkbox-animated">动画效果</label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              选中状态:{" "}
              {Object.entries(checkboxValues)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(", ") || "无"}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4 text-gray-800">自定义单选按钮</h3>

          <div className="mb-6">
            {/* 基础样式单选按钮 */}
            <div className="custom-radio">
              <input
                type="radio"
                id="radio-option1"
                name="radio-group"
                value="选项一"
                checked={radioValue === "选项一"}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <label htmlFor="radio-option1">选项一</label>
            </div>

            {/* 蓝色主题单选按钮 */}
            <div className="custom-radio custom-radio-blue">
              <input
                type="radio"
                id="radio-option2"
                name="radio-group"
                value="选项二"
                checked={radioValue === "选项二"}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <label htmlFor="radio-option2">选项二</label>
            </div>

            {/* 绿色主题单选按钮 */}
            <div className="custom-radio custom-radio-green">
              <input
                type="radio"
                id="radio-option3"
                name="radio-group"
                value="选项三"
                checked={radioValue === "选项三"}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <label htmlFor="radio-option3">选项三</label>
            </div>

            {/* 大尺寸单选按钮 */}
            <div className="custom-radio custom-radio-large">
              <input
                type="radio"
                id="radio-option4"
                name="radio-group"
                value="选项四"
                checked={radioValue === "选项四"}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <label htmlFor="radio-option4">选项四 (大尺寸)</label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">选中状态: {radioValue || "无"}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* 基础复选框样式 */
        .custom-checkbox {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .custom-checkbox input[type="checkbox"] {
          opacity: 0;
          position: absolute;
          width: 24px;
          height: 24px;
          z-index: 1;
          cursor: pointer;
        }

        .custom-checkbox label {
          padding-left: 35px;
          cursor: pointer;
          position: relative;
        }

        .custom-checkbox label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          border: 2px solid #3b82f6;
          border-radius: 4px;
          background-color: white;
          transition: all 0.2s ease;
        }

        .custom-checkbox input[type="checkbox"]:checked + label::before {
          background-color: #3b82f6;
        }

        .custom-checkbox input[type="checkbox"]:checked + label::after {
          content: '';
          position: absolute;
          left: 8px;
          top: 4px;
          width: 8px;
          height: 14px;
          border: solid white;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }

        .custom-checkbox input[type="checkbox"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .custom-checkbox input[type="checkbox"]:hover + label::before {
          border-color: #2563eb;
        }

        /* 蓝色主题 */
        .custom-checkbox-blue label::before {
          border-color: #2563eb;
        }

        .custom-checkbox-blue input[type="checkbox"]:checked + label::before {
          background-color: #2563eb;
        }

        .custom-checkbox-blue input[type="checkbox"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
        }

        /* 绿色主题 */
        .custom-checkbox-green label::before {
          border-color: #10b981;
        }

        .custom-checkbox-green input[type="checkbox"]:checked + label::before {
          background-color: #10b981;
        }

        .custom-checkbox-green input[type="checkbox"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
        }

        /* 动画效果 */
        .custom-checkbox-animated label::before {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .custom-checkbox-animated input[type="checkbox"]:checked + label::before {
          transform: scale(1.1);
        }

        .custom-checkbox-animated input[type="checkbox"]:checked + label::after {
          animation: checkmark 0.2s ease-in-out forwards;
        }

        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0) rotate(45deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(45deg);
          }
        }

        /* 基础单选按钮样式 */
        .custom-radio {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .custom-radio input[type="radio"] {
          opacity: 0;
          position: absolute;
          width: 24px;
          height: 24px;
          z-index: 1;
          cursor: pointer;
        }

        .custom-radio label {
          padding-left: 35px;
          cursor: pointer;
          position: relative;
        }

        .custom-radio label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          background-color: white;
          transition: all 0.2s ease;
        }

        .custom-radio input[type="radio"]:checked + label::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #3b82f6;
          transition: all 0.2s ease;
        }

        .custom-radio input[type="radio"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .custom-radio input[type="radio"]:hover + label::before {
          border-color: #2563eb;
        }

        /* 蓝色主题 */
        .custom-radio-blue label::before {
          border-color: #2563eb;
        }

        .custom-radio-blue input[type="radio"]:checked + label::after {
          background-color: #2563eb;
        }

        .custom-radio-blue input[type="radio"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
        }

        /* 绿色主题 */
        .custom-radio-green label::before {
          border-color: #10b981;
        }

        .custom-radio-green input[type="radio"]:checked + label::after {
          background-color: #10b981;
        }

        .custom-radio-green input[type="radio"]:focus + label::before {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
        }

        /* 大尺寸 */
        .custom-radio-large label::before {
          width: 30px;
          height: 30px;
        }

        .custom-radio-large label {
          padding-left: 42px;
        }

        .custom-radio-large input[type="radio"]:checked + label::after {
          left: 8px;
          top: 8px;
          width: 14px;
          height: 14px;
        }
      `}</style>
    </section>
  )
}
