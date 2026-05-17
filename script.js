const PAGE_DATA = {
  profile: {
    name: "陈玉洲",
    title: "AI产品经理",
    bio: "专注企业级AI产品的需求洞察与方案落地，擅长把复杂业务抽象为清晰的流程与可交付的产品体验。",
    avatarUrl: "",
  },
  contacts: [
    {
      type: "email",
      label: "Email",
      value: "lizzychen19960222@gmail.com",
      href: "mailto:lizzychen19960222@gmail.com",
      copyable: true,
      icon: "mail",
      social: true,
    },
    {
      type: "phone",
      label: "Phone",
      value: "+86 138 0000 0000",
      href: "tel:+8613800000000",
      copyable: true,
      icon: "phone",
      social: false,
    },
    {
      type: "wechat",
      label: "WeChat",
      value: "thisisyuzhou",
      copyable: true,
      icon: "wechat",
      social: false,
    },
    {
      type: "github",
      label: "GitHub",
      value: "github.com/yourname",
      href: "https://github.com/yourname",
      copyable: false,
      icon: "github",
      social: true,
    },
    {
      type: "homepage",
      label: "Website",
      value: "your.site",
      href: "https://your.site",
      copyable: false,
      icon: "link",
      social: true,
    },
  ],
  projects: {
    RAG: [
      {
        name: "RAG Demo",
        desc: "知识库问答：向量检索 + 重排序 + 引用展示。",
        github: "https://github.com/",
      },
    ],
    Workflow: [
      {
        name: "Workflow Builder",
        desc: "可视化流程编排：节点、连线、运行日志与可复用模板。",
        github: "https://github.com/",
      },
    ],
    Agent: [
      {
        name: "Agent Toolkit",
        desc: "工具调用与多轮对话：规划、执行与可观测性。",
        github: "https://github.com/",
      },
    ],
  },
};

const el = {
  avatar: document.getElementById("avatar"),
  name: document.getElementById("name"),
  title: document.getElementById("title"),
  bio: document.getElementById("bio"),
  contactList: document.getElementById("contactList"),
  socialBar: document.getElementById("socialBar"),
  toast: document.getElementById("toast"),
  projectDialog: document.getElementById("projectDialog"),
  projectForm: document.getElementById("projectForm"),
  projectGroup: document.getElementById("projectGroup"),
  projectName: document.getElementById("projectName"),
  projectDesc: document.getElementById("projectDesc"),
  projectGithub: document.getElementById("projectGithub"),
  dialogTitle: document.getElementById("dialogTitle"),
};

let toastTimer = 0;

function showToast(message) {
  if (!el.toast) return;
  el.toast.textContent = message;
  el.toast.classList.add("isOn");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.toast && el.toast.classList.remove("isOn"), 1800);
}

function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("timeout")), timeoutMs);
    promise
      .then((v) => {
        window.clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        window.clearTimeout(timer);
        reject(e);
      });
  });
}

async function copyText(text) {
  const value = String(text ?? "").trim();
  if (!value) throw new Error("empty");

  if (navigator.clipboard && window.isSecureContext) {
    await withTimeout(navigator.clipboard.writeText(value), 900);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!ok) throw new Error("copy-failed");
}

function iconSvg(name) {
  if (name === "mail") {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 7.5h15v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.8"/><path d="m5.5 8.2 6.2 5a1.2 1.2 0 0 0 1.5 0l6.3-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  if (name === "phone") {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.2 3.8h2.2l1.3 4-2 1.4c1 2 2.6 3.6 4.6 4.6l1.4-2 4 1.3v2.2c0 1-0.8 1.8-1.8 1.8A13.7 13.7 0 0 1 5.4 5.6c0-1 .8-1.8 1.8-1.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }
  if (name === "github") {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.6a9.6 9.6 0 0 0-3 18.7c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.2-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.6Z" fill="currentColor" opacity=".9"/></svg>';
  }
  if (name === "link") {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 13a4 4 0 0 1 0-5.7l1.3-1.3a4 4 0 1 1 5.7 5.7l-.8.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 11a4 4 0 0 1 0 5.7l-1.3 1.3a4 4 0 1 1-5.7-5.7l.8-.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }
  if (name === "wechat") {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 17.7c-3.3 0-6-2.2-6-5 0-2.7 2.7-5 6-5s6 2.2 6 5c0 .5-.1 1-.3 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14.4 21c-2.8 0-5.1-1.8-5.1-4.1s2.3-4.1 5.1-4.1c2.8 0 5.1 1.8 5.1 4.1S17.2 21 14.4 21Z" stroke="currentColor" stroke-width="1.8"/><path d="M7.2 12.4h.1M11.7 12.4h.1M13.1 16.6h.1M16.6 16.6h.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  }
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/></svg>';
}

function renderProfile() {
  const { profile } = PAGE_DATA;
  if (el.name) el.name.textContent = profile.name || "";
  if (el.title) el.title.textContent = profile.title || "";
  if (el.bio) el.bio.textContent = profile.bio || "";
  if (el.avatar && profile.avatarUrl) el.avatar.src = profile.avatarUrl;
  if (el.avatar) el.avatar.alt = `${profile.name || "个人"}头像`;
}

function renderContacts() {
  if (!el.contactList) return;
  el.contactList.innerHTML = "";

  for (const c of PAGE_DATA.contacts) {
    const li = document.createElement("li");
    li.className = "contactItem";

    const icon = document.createElement("div");
    icon.innerHTML = iconSvg(c.icon || c.type);

    const meta = document.createElement("div");
    meta.className = "contactMeta";

    const label = document.createElement("div");
    label.className = "contactLabel";
    label.textContent = c.label || c.type || "Contact";

    const value = document.createElement("div");
    value.className = "contactValue";
    if (c.href) {
      const a = document.createElement("a");
      a.href = c.href;
      if (/^https?:\/\//i.test(c.href)) {
        a.target = "_blank";
        a.rel = "noreferrer";
      }
      a.textContent = c.value || "";
      value.appendChild(a);
    } else {
      value.textContent = c.value || "";
    }

    meta.appendChild(label);
    meta.appendChild(value);

    const actions = document.createElement("div");

    if (c.copyable) {
      const btn = document.createElement("button");
      btn.className = "miniBtn";
      btn.type = "button";
      btn.setAttribute("data-copy", c.value || "");
      btn.setAttribute("aria-label", `复制 ${c.label || c.type}`);
      btn.textContent = "复制";
      actions.appendChild(btn);
    }

    li.appendChild(icon);
    li.appendChild(meta);
    li.appendChild(actions);
    el.contactList.appendChild(li);
  }
}

function renderSocial() {
  if (!el.socialBar) return;
  el.socialBar.innerHTML = "";

  for (const c of PAGE_DATA.contacts) {
    if (!c.social) continue;
    if (!c.href) continue;
    const a = document.createElement("a");
    a.className = "iconBtn";
    a.href = c.href;
    a.setAttribute("aria-label", c.label || c.type || "social");
    if (/^https?:\/\//i.test(c.href)) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
    a.innerHTML = iconSvg(c.icon || c.type);
    el.socialBar.appendChild(a);
  }
}

function projectMount(group) {
  return document.getElementById(`projects-${group}`);
}

function renderProjects(group) {
  const mount = projectMount(group);
  if (!mount) return;

  mount.innerHTML = "";
  const list = PAGE_DATA.projects[group] || [];

  for (const p of list) {
    const card = document.createElement("article");
    card.className = "projectCard";

    const name = document.createElement("h4");
    name.className = "projectName";
    name.textContent = p.name || "";

    const desc = document.createElement("p");
    desc.className = "projectDesc";
    desc.textContent = p.desc || "";

    const actions = document.createElement("div");
    actions.className = "projectActions";

    const link = document.createElement("a");
    link.className = "ghostBtn";
    link.href = p.github || "#";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "GitHub";
    actions.appendChild(link);

    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(actions);
    mount.appendChild(card);
  }
}

function renderAllProjects() {
  renderProjects("RAG");
  renderProjects("Workflow");
  renderProjects("Agent");
}

function openProjectDialog(group) {
  const g = String(group || "");
  if (!g) return;

  if (el.projectGroup) el.projectGroup.value = g;
  if (el.dialogTitle) el.dialogTitle.textContent = `添加项目 · ${g}`;
  if (el.projectName) el.projectName.value = "";
  if (el.projectDesc) el.projectDesc.value = "";
  if (el.projectGithub) el.projectGithub.value = "https://github.com/";

  if (el.projectDialog && typeof el.projectDialog.showModal === "function") {
    el.projectDialog.showModal();
    window.setTimeout(() => el.projectName && el.projectName.focus(), 0);
    return;
  }

  const name = window.prompt(`添加项目（${g}）\n项目名称：`);
  if (!name) return;
  const desc = window.prompt("简介：");
  if (!desc) return;
  const github = window.prompt("GitHub 链接：", "https://github.com/");
  if (!github) return;

  PAGE_DATA.projects[g] = PAGE_DATA.projects[g] || [];
  PAGE_DATA.projects[g].push({ name, desc, github });
  renderProjects(g);
  showToast(`已添加项目：${name}`);
}

function closeProjectDialog() {
  if (el.projectDialog && typeof el.projectDialog.close === "function") {
    el.projectDialog.close();
  }
}

function setupEvents() {
  document.addEventListener("click", async (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;

    const copyBtn = target.closest("[data-copy]");
    if (copyBtn) {
      const text = copyBtn.getAttribute("data-copy") || "";
      try {
        await copyText(text);
        showToast(`已复制：${text}`);
      } catch (err) {
        showToast("复制失败：请手动选择并复制");
      }
      return;
    }

    const addBtn = target.closest("[data-add]");
    if (addBtn) {
      openProjectDialog(addBtn.getAttribute("data-add"));
      return;
    }

    const closeBtn = target.closest("[data-close-dialog]");
    if (closeBtn) {
      closeProjectDialog();
    }
  });

  if (el.projectForm) {
    el.projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitter = e.submitter;
      const isCancel = submitter && submitter.value === "cancel";
      if (isCancel) {
        closeProjectDialog();
        return;
      }

      if (!el.projectForm.reportValidity()) return;

      const group = (el.projectGroup && el.projectGroup.value) || "";
      const name = (el.projectName && el.projectName.value) || "";
      const desc = (el.projectDesc && el.projectDesc.value) || "";
      const github = (el.projectGithub && el.projectGithub.value) || "";

      PAGE_DATA.projects[group] = PAGE_DATA.projects[group] || [];
      PAGE_DATA.projects[group].push({ name, desc, github });

      renderProjects(group);
      closeProjectDialog();
      showToast(`已添加项目：${name}`);
    });
  }

  if (el.projectDialog) {
    el.projectDialog.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t === el.projectDialog) closeProjectDialog();
    });
  }
}

renderProfile();
renderContacts();
renderSocial();
renderAllProjects();
setupEvents();

